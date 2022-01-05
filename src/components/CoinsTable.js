import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../context/CryptoContext';
import { numberWithCommas } from './Carousel';




export default function CoinsTable() {
   
     const [coins, setCoins] = useState([]);
     const [loading, setLoading] = useState(false);
     const [search, setSearch] = useState('')
     const { currency, symbol } = CryptoState();
     const navigate = useNavigate();

     const fetchCoins = async()=>{
         setLoading(true)
         const { data } = await axios.get(CoinList(currency));
         
         setCoins(data)
         setLoading(false);
     }
    //  console.log(coins);
     useEffect(() => {
         fetchCoins()
         
     }, [currency]);

     const darkTheme = createTheme({
        palette:{
            primary:{
                main:'#ffffff',
            },
            type:'dark',
        },
        
     });

     const handleSearch = ()=>{
         return coins.filter((coin)=>(
             coin.name.toLowerCase().includes(search) || 
             coin.symbol.toLowerCase().includes(search)

         ));
     };

     const useStyles = makeStyles(()=>({
        row:{
            backgroundColor:'#16171a',
            cursor:'pointer',
            '&:hover':{
                backgroundColor:'#222f3e',
            },
            fontFamily:'Montserrat'
        }
     }))

     const classes = useStyles();
    return (
        <div>
            <ThemeProvider value={darkTheme}>
                <Container style={{textAlign:'center'}}>
                    <Typography
                     variant='h4'
                     style={{margin:20, fontFamily:'Montserrat'}}
                    >
                        Cryptocurrency Price by Market Cap
                    </Typography>
                    <TextField 
                    label='Search For a Crypto Currency'
                    variant='outlined'
                  
                    style={{marginBottom:20, width:'100%'}}
                    onChange={(e)=>setSearch(e.target.value)}
                    />

                    <TableContainer>
                        {
                            loading ?(
                                <LinearProgress style={{backgroundColor: 'blue'}} />
                            ):(
                                <Table>
                                    <TableHead style={{backgroundColor:'#eebcd1'}}>
                                        <TableRow>
                                            {['Coin','Price','24h Change','Market Cap'].map((head) =>(
                                                <TableCell 
                                                style={{
                                                    color:'#000000',
                                                    fontFamily:'Montserrat',
                                                    fontWeight:'700'
                                                }}
                                                key={head}
                                                align={head==='Coin' ? "": 'right'}
                                                >
                                                    {head} 
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {handleSearch().map((row)=>{
                    
                                            const profit = row.price_change_percentage_24h > 0;

                                            return (
                                                <TableRow
                                                    onClick={()=>navigate(`/coins/${row.id}`)}
                                                    className = {classes.row}
                                                    key={row.name}
                                                    >
                                                        <TableCell 
                                                        component='th' 
                                                        scope='row'
                                                        style={{
                                                            display:'flex',
                                                            gap:15,
                                                        }}
                                                        >
                                                            <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height='50'
                                                            style={{marginBottom: 10}}
                                                            />
                                                           
                                                            <div
                                                            style={{ display: "flex", flexDirection: "column" }}
                                                            >
                                                            <span
                                                            style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                                color:'#ffffff'
                                                            }}
                                                            >
                                                            {row.symbol}
                                                            </span>
                                                            <span style={{ color: "#ffffff" }}>
                                                                {row.name}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align='right' style={{color:'#ffffff',}}>
                                                            {symbol} {' '}
                                                            {numberWithCommas(row.current_price.toFixed(2))}
                                                        </TableCell>
                                                        <TableCell align='right' 
                                                        style={{ color : profit > 0 ? 'green' : 'red', fontWeight:500,}}>
                                                            {profit && '+'}
                                                            {row.price_change_percentage_24h.toFixed(2)}%
                                                        </TableCell>
                                                        <TableCell align='right' style={{color:'#ffffff'}}>
                                                            {symbol}{' '}
                                                            {numberWithCommas(
                                                                row.market_cap.toString().slice(0,-6)
                                                            )}
                                                            M
                                                        </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            )
                        }
                    </TableContainer>
                </Container>
            </ThemeProvider>
        </div>
    )
}


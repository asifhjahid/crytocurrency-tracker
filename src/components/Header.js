import { AppBar, Container, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import createTheme from '@material-ui/core/styles/createTheme';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../context/CryptoContext';


const useStyles = makeStyles(()=>({
    title:{
        flex:1,
        color:'#e84118',
        fontFamily:'Montserrat',
        fontWeight:'bold',
        cursor:'pointer',
    },
}))

export default function Header() {
    const classes = useStyles();
    const navigate = useNavigate();

    const { currency, setCurrency } = CryptoState();
    console.log(currency);

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:'#ffffff',
            },
            type:'dark',
        }
    })
    return (
        <ThemeProvider theme={darkTheme}>

        
        <AppBar color='transparent' position='static'>
         <Container>
             <Toolbar>
                 <Typography
                  onClick={()=>navigate('/')}
                  className={classes.title}
                  variant='h6'
                  >
                     Crypto Currency
                 </Typography>
                 <Select variant='outlined' style={{
                     width:100,
                     height:40,
                     marginRight:15,
                 }}
                 
                 value={currency}
                 onChange={(e)=>setCurrency(e.target.value)}

                 >
                     <MenuItem value={'USD'}>USD</MenuItem>
                     <MenuItem value={'BDT'}>BDT</MenuItem>
                 </Select>
             </Toolbar>
         </Container>
        </AppBar>
        </ThemeProvider>
    )
}

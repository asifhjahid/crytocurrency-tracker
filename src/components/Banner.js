import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage:"url(./banner.jpg)",
    },
    bannerContent:{
        height:400,
        display:'flex',
        flexDirection:'column',
        paddingTop:25,
        justifyContent:'space-around',
    },
    titleLine: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      },
}))

export default function Banner() {
    const classes  = useStyles()
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}> 
               <div className={classes.titleLine}>
               <Typography
                 variant='h2'
                 style={{
                     fontWeight:'bold',
                     marginBottom:15,
                     fontFamily:'Montserrat'
                 }}
                >
                    Crypto Currency
                </Typography>
                <Typography
                 variant='subtitle2'
                 style={{
                     color:'darkgrey',
                     textTransform:'capitalize',
                     fontFamily:'Montserrat',
                     
                 }}

                >
                    Get all the info regarding your favorite crypto currency
                </Typography>
               </div>
            </Container>
        </div>
    )
}

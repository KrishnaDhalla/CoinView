import React from 'react'
import {AppBar,Toolbar,Typography,MenuItem,Select,Container} from '@mui/material';
import logo from '../assets/logo3.png';
import{useNavigate} from "react-router-dom";
 import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../Cryptocontext';
const Navbar = () => {
  const navigate=useNavigate()
  const {currency,setCurrency}=CryptoState()
  console.log(currency)
  const darkTheme = createTheme({
    palette: {
      primary:{
        main:"#ffffff",
      },
      mode:"dark",
    },
  });
  return (
   <ThemeProvider theme={darkTheme}>
   <AppBar color="transparent" position="static">
    <Container>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <div style={{display:'flex' ,alignItems:'center',cursor:'pointer' }} onClick={()=>navigate("/")}>
    <img src={logo} alt="Logo" height="40" style={{marginRight: 15}}/>
      <Typography style={{
            fontWeight:"600",
            fontSize: "20px"
          }} >
        CoinView
      </Typography>
      </div>
      <Select varient="outlined" sx={{
            width:100,
            height:40,
            marginLeft:15,
            color:"primary"
          }}
          value={currency}
          onChange={(e)=>setCurrency(e.target.value)}>
        <MenuItem value={"USD"} >USD</MenuItem>
        <MenuItem value={"INR"}>INR</MenuItem>
      </Select>
    </Toolbar>
    </Container>
   </AppBar>
    </ThemeProvider>
  )
}

export default Navbar
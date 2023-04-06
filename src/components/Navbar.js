import React from "react";
import {
  AppBar,
  Typography,
  MenuItem,
  Select,
  Container,
  styled,
  Toolbar,
} from "@mui/material";
import logo from "../Asset/logo3.png";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoState } from "../Cryptocontext";
import AuthModel from "./Authentication/AuthModel";
import UserSideBar from "./Authentication/UserSideBar";
const Navbar = () => {
  const navigate = useNavigate();
  const { currency, setCurrency,user } = CryptoState();
  console.log(currency);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      mode: "dark",
    },
  });
  // const Toolbar=styled(Toolbar)(({ theme }) => ({
  //   alignSelf: "start",
  //   padding: 25,
  //   paddingTop: 10,
  //   width: "100%",
  //   [theme.breakpoints.down("md")]: {
  //     display: "flex",
  //     flexDirection:"column",
  //     alignItems: "center",
  //   },
  //   [theme.breakpoints.down("sm")]: {
  //     flexDirection: "column",
  //     alignItems: "center",
  //   },
  //   [theme.breakpoints.down("xs")]: {
  //     alignItems: "start",
  //   },
  // }));
  // sx={{ display: "flex", justifyContent: "space-between" }}
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <img
                src={logo}
                alt="Logo"
                height="40"
                style={{ marginRight: 15 }}
              />
              <Typography
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  flexGrow:1,
                  fontWeight: 600,
                  color: "inherit",
                  textDecoration: "none",
                  fontSize:20,
                }}
              >
                CoinView
              </Typography>
              <Typography
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
              fontSize:20,  
            }}
          >
            CoinView
          </Typography>
            </div>
            <div style={{display:"flex", gap:15}}>
            <Select
              varient="outlined"
              sx={{
                display:{xs:"none",md:"flex"},
                width: 100,
                height: 40,
                marginLeft: 15,
                color: "primary",
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user?<UserSideBar/>:<AuthModel />}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;

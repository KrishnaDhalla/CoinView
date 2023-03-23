import {
  TextField,
  Typography,
  Container,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Pagination,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../Cryptocontext";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { numberWithCommas } from "./Banner/Carousel";
import { Colors } from "chart.js";
import { Stack } from "@mui/system";
const CoinsTable = () => {
  const { currency, symbol } = CryptoState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    setCoins(data);
    setLoading(false);
  };

  //console.log(coins)
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const StyledTableRow = styled(TableRow)({
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    }
  });

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      mode: "dark",
    },
  });
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          color="primary"
          sx={{ marginBottom: "20", width: "100%" }}
           onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
          {loading ? (
            <LinearProgress className="tablehead-background" />
          ) : (
            <Table aria-label="simple table">
              <TableHead className="tablehead-background">
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      sx={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                .slice((page-1)*10,(page-1)*10+10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <StyledTableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          display: "flex",
                          gap: 12,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgray" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Box justifyContent={"center"} alignItems="center" display={"flex"} sx={{
          paddingTop:10,
          paddingBottom:10,
          maxWidth:"100%",
        }}>
        <Pagination 
        count={(handleSearch().length/10).toFixed(0)}
        size="medium"
        variant="outlined"
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}/>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;



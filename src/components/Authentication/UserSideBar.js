import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { CryptoState } from "../../Cryptocontext";
import { Avatar, Button, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Carousel";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, setDoc } from "firebase/firestore";

export default function UserSideBar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert, watchlist, coins, symbol, currency, setCurrency } =
    CryptoState();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const Container = styled("div")({
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  });

  const Profile = styled("div")({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  });
  const WatchList = styled("div")({
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  });
  const StyledButton = styled(Button)({
    height: "5%",
    width: "100%",
    backgroundColor: "#43e97b",
    marginTop: 20,
  });
  const Styledcoin = styled("div")({
    padding: 10,
    display: "flex",
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#CAFFADFF",
    boxShadow: "0 0 3px black",
  });
  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successful !!",
    });
    toggleDrawer();
  };
  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "warning",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  //   console.log(user.email)

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#43e97b",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Container>
              <Profile>
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {" "}
                  {user.displayName || user.email}
                </span>
                <Select
                  varient="outlined"
                  sx={{
                    display: { xs: "flex", md: "none" },
                    width: 100,
                    height: 40,
                    color: "primary",
                  }}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
                <WatchList>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    WatchList
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <Styledcoin>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <DeleteIcon
                              sx={{ cursor: "pointer", fontSize: "16" }}
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </Styledcoin>
                      );
                  })}
                </WatchList>
              </Profile>
              <StyledButton variant="contained" onClick={logOut}>
                Log Out
              </StyledButton>
            </Container>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

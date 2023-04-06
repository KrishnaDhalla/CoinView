import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Login } from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../Cryptocontext";

const Paper = styled("div")(({ theme }) => ({
  width: 400,
  backgroundColor: theme.palette.background.paper,
  color: "white",
  borderRadius: 10,
}));
export default function AuthModel() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const {setAlert}=CryptoState()
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const Box = styled("div")({
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  })
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  console.log(selectedTab);
  return (
    <div>
      <Button
        variant="outlined"
        style={{ width: 85, height: 40 }}
        onClick={handleOpen}
      >
        Login
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper>
          <Box sx={{ borderColor: "divider" }}>
            <Tabs
              variant="fullWidth"
              value={selectedTab}
              onChange={handleTabChange}
            >
              <Tab label="LOGIN" />
              <Tab label="SIGN UP" />
            </Tabs>
          </Box>
          { selectedTab=== 0 && <Login handleClose={handleClose} />}
          { selectedTab=== 1 && <Signup handleClose={handleClose} />}
          <Box>
            <span>OR</span>
             <GoogleButton style={{width:"100%",outline:"none"}} onClick={signInWithGoogle}/>
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}

import { Snackbar, Alert } from '@mui/material';
import React from 'react'
import { CryptoState } from '../Cryptocontext'

export const Alerts = () => {
  const {alert,setAlert}=CryptoState()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({open:false});
  };
    return (
        <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
         <Alert severity={alert.type} onClose={handleClose} variant="filled" elevation={10}>{alert.message}</Alert>
      </Snackbar>
  )
}

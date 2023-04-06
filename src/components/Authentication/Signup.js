import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { CryptoState } from '../../Cryptocontext'
import {auth} from '../../firebase'
const Signup = ({handleClose}) => {
    const [email,SetEmail]=useState("")
    const [password,SetPassword]=useState("")
    const [confirmPassword,SetconfirmPassword]=useState("")
    const {setAlert}=CryptoState()
    const handleSubmit= async ()=>{
        if(password!==confirmPassword){
            setAlert({
                open:true,
                message:'Password do not Match',
                type:"error"
            })
            return;
        }
        try {
            const result=await createUserWithEmailAndPassword(auth,email,password)
            console.log(result)
            setAlert({
                open:true,
                message:`Sign Up Successful. Welcome ${result.user.email}`,
                type:'success'

            })
            handleClose()
        } catch (error) {
            setAlert({
                open:true,
                message:error.message,
                type:"error",
            })
            return;
        }
    }
  return (
    <Box p={3} sx={{display:"flex",flexDirection:"column", gap:"20px"}}>
        <TextField
        variant='outlined'
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e)=>SetEmail(e.target.value)}
        fullWidth
        >

        </TextField>
        <TextField
        variant='outlined'
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e)=>SetPassword(e.target.value)}
        fullWidth
        >

        </TextField>
        <TextField
        variant='outlined'
        type="password"
        label="Enter Confirm Password"
        value={confirmPassword}
        onChange={(e)=>SetconfirmPassword(e.target.value)}
        fullWidth
        >
        </TextField>
        <Button variant="contained" size='large' sx={{backgroundColor:"#43e97b"}} onClick={handleSubmit}>
        Sign Up
        </Button>
    </Box>
  )
}

export default Signup
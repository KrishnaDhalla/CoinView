import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Banner from '../components/Banner/Banner'
import CoinsTable from '../components/CoinsTable'
import "../App.css"

const Homepage = () => {
  return (
    <div className='gradient-background'>
    <Banner/>
    <CoinsTable/>
    </div>
  )
}

export default Homepage
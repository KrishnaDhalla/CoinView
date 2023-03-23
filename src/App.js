
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
 import Navbar from './components/Navbar'
// import Drawer from './components/Drawer';
import Homepage from './Pages/Homepage'
import { CoinPage } from './Pages/Coinpage'
import { Box } from "@mui/material";
function App() {
  return (
    <Router>
      <Box  sx={{
          backgroundColor: "#1F2937",
          color: "white",
          minHeight: "100vh",
        }}>
      <div>
       
        {/* <Drawer/> */}
        <Navbar/>
        <Routes>
        <Route exact path='/' element={<Homepage/>}/>
        <Route exact path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
      </div>
      </Box>
    </Router>
  );
}

export default App;

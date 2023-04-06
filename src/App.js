
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
 import Navbar from './components/Navbar'
// import Drawer from './components/Drawer';
import Homepage from './Pages/Homepage'
import { CoinPage } from './Pages/Coinpage'
import { Box } from "@mui/material";
import { Alerts } from './components/Alerts';
function App() {
  return (
    <Router>
      <Box  sx={{
          backgroundColor: "#1F2937",
          color: "white",
          minHeight: "100vh",
        }}>
      <div>
        <Navbar/>
        <Routes>
        <Route exact path='/' element={<Homepage/>}/>
        <Route exact path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
      </div>
      <Alerts/>
      </Box>
    </Router>
  );
}

export default App;

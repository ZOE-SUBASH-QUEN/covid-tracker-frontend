import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";

import About from "./About";
import ContactUs from ".ContactUs";
import Info from "./info";


import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Footer from "./components/Footer"



require("dotenv").config();

function App() {
  
  return (
    
    <div className="App">
      
      
      <Router>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />}/>
          <Route path="/info" element={<Info />}/>
        
          <Route path = "/" element={<Body /> }/>
      </Routes>
      </Router>
     
      
     
      <Body />
      <Footer />
    </div>
   
    
    
  );
}

export default App;

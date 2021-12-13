import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";

import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Info from "./pages/Info";


import {BrowserRouter as Router, Routes, Route, Switch} from "react-router-dom";

import Footer from "./components/Footer"
// import Switch from "react-bootstrap/esm/Switch";



require("dotenv").config();

function App() {
  
  return (
    
    <div className="App">
      
      <Body />
      <Footer />
    </div>
   
    
    
  );
}

export default App;

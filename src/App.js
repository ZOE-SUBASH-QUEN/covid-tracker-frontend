import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
<<<<<<< HEAD
import About from "./About";
import ContactUs from ".ContactUs";
import Info from "./info";


import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

=======
>>>>>>> fda06d5712626f76e6f84d2d95bee7cc608743de


require("dotenv").config();

function App() {
  
  return (
    
    <div className="App">
<<<<<<< HEAD
    
      <Header title={title} />
=======
>>>>>>> ce7019027f0789e08eaffdb7603b5d61fcc2b5aa
      
      
      <Router>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />}/>
          <Route path="/info" element={<Info />}/>
        
          <Route path = "/" element={<Body /> }/>
      </Routes>
      </Router>
     
      
     
    </div>
   
    
    
  );
}

export default App;

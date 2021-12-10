import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import Footer from "./components/Footer"


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

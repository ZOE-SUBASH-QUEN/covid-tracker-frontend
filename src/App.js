import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import Footer from "./components/Footer"

require("dotenv").config();

function App() {
  const title = `COVID-19 Tracker`;
  return (
    
    <div className="App">
      <Header title={title} />
      
      <Body />
      <Footer />
    </div>
  );
}

export default App;

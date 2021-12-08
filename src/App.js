import './App.css';
import Body from './components/Body'
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv').config()


function App() {
  return (
    <div className="App">
      <Header title={"COVID19 Tracker"} />
      <Body />

    </div>
  );
}

export default App;

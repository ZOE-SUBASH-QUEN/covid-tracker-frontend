import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Info from "../pages/Info";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/about" component={About} />
        <Route path="/info" component={Info} />
        <Route path="/contact" component={ContactUs} />
      </Switch>
    </Router>
  );
};

export default AppRouter;

import "./App.css";

import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

import AddPoem from "./pages/AddPoem";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/" class="active">
          Home
        </Link>
        <Link to="/addPoem">Add Poem</Link>
      </nav>
      <div className="container app">
        <Switch>
          <Route path="/addPoem" exact>
            <AddPoem />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import "./App.css";

import {
  NavLink,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import AddPoem from "./pages/AddPoem";
import Home from "./pages/Home";
import PoemPage from "./pages/PoemPage";

function App() {
  return (
    <Router>
      <nav>
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/addPoem" activeClassName="active">
          Add Poem
        </NavLink>
      </nav>
      <div className="container app">
        <Switch>
          <Route path="/addPoem" exact>
            <AddPoem />
          </Route>
          <Route path="/poem/:id" exact>
            <PoemPage />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

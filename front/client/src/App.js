import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./containers/Main";
import Header from "./containers/Header";
import "./App.css";
import FlappyBird from "./containers/FlappyBird";
import NFTDetails from "./containers/NFTDetails";

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/game" component={FlappyBird} />
          <Route path="/NFT/:NFTId" component={NFTDetails} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

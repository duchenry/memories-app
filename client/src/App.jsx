import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Auth, Home, Navbar } from "./components";
const App = () => {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;

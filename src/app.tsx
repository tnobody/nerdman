import "./index.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RemoteControl } from "./routes/remote-control/remote-control-route";
import { Home } from "./routes/home/home";
import { About } from "./routes/about/about";

export const App = () => {
  //return <RemoteControl />;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/remote-control">
          <RemoteControl />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

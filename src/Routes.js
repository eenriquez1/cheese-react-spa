import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import CheesesView from "./views/CheesesView";
import CategoriesView from "./views/CategoriesView";
import MenusView from "./views/MenusView";
import MenuView from "./views/MenuView";


const Routes = () => (
  <Switch>
    {/* we will implement these Route components later */}
    {/* <Route exact path="/" component={HomeView} /> */}
    <Route exact path="/cheeses" component={CheesesView} />
    <Route exact path="/categories" component={CategoriesView} />
    <Route exact path="/menus" component={MenusView} />
    <Route path="/menus/:menuID" component={MenuView} />

  </Switch>
);

export default Routes;
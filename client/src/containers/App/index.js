import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../../components/Header";
import CocktailList from "../../components/CocktailList";
import CocktailDetails from "../../components/CocktailDetails";
import AddCocktail from "../../components/AddCocktail";

export default function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={CocktailList} />
          <Route path="/add-cocktail" component={AddCocktail} />
          <Route path="/:id" component={CocktailDetails} />
        </Switch>
      </Router>
    </Fragment>
  );
}

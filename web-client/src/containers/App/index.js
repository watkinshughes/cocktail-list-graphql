import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../../components/Header";
import CocktailList from "../../components/CocktailList";
import CocktailDetails from "../../components/CocktailDetails";
import SubmitCocktail from "../../components/SubmitCocktail";
import SubmissionConfirmation from "../../components/SubmissionConfirmation";

export default function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={CocktailList} />
          <Route path="/submit-cocktail" component={SubmitCocktail} />
          <Route path="/thank-you" component={SubmissionConfirmation} />
          <Route path="/:slug" component={CocktailDetails} />
        </Switch>
      </Router>
    </Fragment>
  );
}

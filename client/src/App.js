import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import CocktailList from "./components/CocktailList";

const client = new ApolloClient({
  uri: "https://cocktail-list-api.appspot.com/graphql"
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Cocktail List</h1>
        <CocktailList />
      </div>
    </ApolloProvider>
  );
}

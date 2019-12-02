import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import CocktailList from "./components/CocktailList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
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

import React from "react";
import { View, StyleSheet } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { API_URI } from "react-native-dotenv";

import Header from "./components/Header";
import CocktailList from "./components/CocktailList";
import AddCocktail from "./components/AddCocktail";
import CocktailDetails from "./components/CocktailDetails";

const client = new ApolloClient({
  uri: API_URI
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <View style={styles.app}>
          <NativeRouter>
            <Header />
            <View>
              <Route exact path="/" component={CocktailList} />
              <Route path="/add-cocktail" component={AddCocktail} />
              <Route path="/:id" component={CocktailDetails} />
            </View>
          </NativeRouter>
        </View>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    height: "100%",
    fontSize: 16,
    padding: 20,
    backgroundColor: "#f2f2f2"
  }
});

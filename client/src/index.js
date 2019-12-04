import React from "react";
import {render} from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./styles.css";
import App from "./containers/App";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URI
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

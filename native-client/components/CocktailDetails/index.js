import React from "react";
import { Text } from "react-native";

export default function CocktailDetails({ match }) {
  return <Text>{match.params.id}</Text>;
}

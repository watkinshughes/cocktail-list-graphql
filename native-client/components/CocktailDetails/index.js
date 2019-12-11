import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_COCKTAIL_DETAILS = gql`
  query($id: ID) {
    cocktail(id: $id) {
      id
      name
      glass
      category
      garnish
      preparation
      ingredients
    }
  }
`;

export default function CocktailDetails({ match }) {
  const id = match.params.id;
  const { loading, error, data } = useQuery(GET_COCKTAIL_DETAILS, {
    variables: { id }
  });

  if (loading) {
    return (
      <View style="loading">
        <Text>Loading</Text>
      </View>
    );
  }
  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <View style={styles.cocktailDetails}>
      <Text>{data.cocktail.name}</Text>
      <Text style={styles.displayLinebreak}>{data.cocktail.ingredients}</Text>
      <Text>{data.cocktail.preparation}</Text>
      <Text>Standard garnish: {data.cocktail.garnish}</Text>
      <Text>Glassware: {data.cocktail.glass}</Text>
      <Text>{data.cocktail.category}</Text>
      <Link to="/">
        <Text>← Back</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  cocktailDetails: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff"
  },
  displayLinebreak: {}
});

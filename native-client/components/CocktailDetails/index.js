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
      <Text style={styles.header1}>{data.cocktail.name}</Text>
      <Text style={styles.header2}>{data.cocktail.category}</Text>
      <Text style={styles.body}>{data.cocktail.ingredients}</Text>
      <Text style={styles.body}>{data.cocktail.preparation}</Text>
      <Text style={styles.body}>
        <Text style={styles.bold}>Standard garnish: </Text>
        {data.cocktail.garnish}
      </Text>
      <Text style={styles.body}>
        <Text style={styles.bold}>Glassware: </Text>
        {data.cocktail.glass}
      </Text>
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
  header1: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5
  },
  header2: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5
  },
  body: {
    marginVertical: 10
  },
  bold: {
    fontWeight: "bold"
  }
});

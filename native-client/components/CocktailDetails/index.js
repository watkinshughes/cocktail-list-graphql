import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
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
      imageUrl
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
    <ScrollView style={styles.cocktailDetails}>
      <View style={styles.recipeInfo}>
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
          <View style={styles.backButton}>
            <Image
              style={styles.icon}
              source={require("../../assets/arrow-left.png")}
            />
            <Text>Back</Text>
          </View>
        </Link>
      </View>
      {data.cocktail.imageUrl ? (
        <View style={styles.image}>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: data.cocktail.imageUrl }}
          />
        </View>
      ) : (
        <View />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cocktailDetails: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff",
    display: "flex"
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
  },
  recipeInfo: {
    padding: 10
  },
  backButton: {
    display: "flex",
    flexDirection: "row",
    width: "100%"
  },
  icon: {
    width: 10,
    height: 10,
    alignSelf: "flex-start",
    marginTop: 7,
    marginRight: 10
  },
  image: {
    padding: 10
  }
});

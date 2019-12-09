import React, { useState } from "react";
import { View, Button, TextInput, Picker, StyleSheet } from "react-native";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const ADD_COCKTAIL = gql`
  mutation(
    $name: String!
    $ingredients: String!
    $glass: String!
    $garnish: String!
    $category: String!
    $preparation: String!
  ) {
    addCocktail(
      name: $name
      ingredients: $ingredients
      glass: $glass
      garnish: $garnish
      category: $category
      preparation: $preparation
    ) {
      name
      ingredients
      glass
      garnish
      category
      preparation
    }
  }
`;

export default function AddCocktail(props) {
  const [name, setName] = useState("");
  const [glass, setGlass] = useState("");
  const [category, setCategory] = useState("");
  const [garnish, setGarnish] = useState("");
  const [preparation, setPreparation] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleNameChange = text => {
    setName(text.nativeEvent.text);
  };

  const handleCategoryChange = itemValue => {
    setCategory(itemValue);
  };

  const handleGlassChange = itemValue => {
    setGlass(itemValue);
  };

  const handleGarnishChange = text => {
    setGarnish(text.nativeEvent.text);
  };

  const handlePreparationChange = text => {
    setPreparation(text.nativeEvent.text);
  };

  const handleIngredientsChange = text => {
    setIngredients(text.nativeEvent.text);
  };

  return (
    <Mutation
      mutation={ADD_COCKTAIL}
      variables={{
        name: name,
        ingredients: ingredients,
        glass: glass,
        garnish: garnish,
        category: category,
        preparation: preparation
      }}
      onCompleted={() => {
        props.history.push("/");
      }}
    >
      {(addCocktail, { loading, error }) => {
        if (loading) return null;
        if (error) return `Error: ${error}`;
        return (
          <View>
            <TextInput
              style={styles.textInput}
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleNameChange}
            />
            <Picker
              style={styles.select}
              selectedValue={category}
              onValueChange={handleCategoryChange}
              prompt="Category"
            >
              <Picker.Item label="Category" value="" />
              <Picker.Item
                label="Before Dinner Cocktail"
                value="Before Dinner Cocktail"
              />
              <Picker.Item
                label="After Dinner Cocktail"
                value="After Dinner Cocktail"
              />
              <Picker.Item label="All Day Cocktail" value="All Day Cocktail" />
              <Picker.Item label="Longdrink" value="Longdrink" />
              <Picker.Item
                label="Sparkling Cocktail"
                value="Sparkling Cocktail"
              />
            </Picker>
            <Picker
              style={styles.select}
              selectedValue={glass}
              onValueChange={handleGlassChange}
              prompt="Glass"
            >
              <Picker.Item label="Glass" value="" />
              <Picker.Item label="Martini" value="Martini" />
              <Picker.Item label="Coup" value="Coup" />
              <Picker.Item label="Old-fashioned" value="Old-fashioned" />
              <Picker.Item label="Collins" value="Collins" />
              <Picker.Item label="Highball" value="Highball" />
              <Picker.Item label="Champagne" value="Champagne" />
              <Picker.Item label="Margarita" value="Margarita" />
            </Picker>
            <TextInput
              style={styles.textArea}
              name="ingredients"
              placeholder="Ingredients"
              multiline={true}
              onChange={handleIngredientsChange}
            />
            <TextInput
              style={styles.textArea}
              name="preparation"
              placeholder="Preparation"
              multiline={true}
              onChange={handlePreparationChange}
            />
            <TextInput
              style={styles.textInput}
              type="text"
              placeholder="Garnish"
              name="granish"
              onChange={handleGarnishChange}
            />
            <Button
              style={styles.button}
              onPress={addCocktail}
              title="Submit"
            />
          </View>
        );
      }}
    </Mutation>
  );
}

const styles = StyleSheet.create({
  select: {
    backgroundColor: "#fff",
    height: 40,
    padding: 10,
    marginVertical: 10
  },
  textInput: {
    backgroundColor: "#fff",
    height: 40,
    padding: 10,
    marginVertical: 10
  },
  textArea: {
    backgroundColor: "#fff",
    height: 160,
    padding: 10,
    marginVertical: 10
  },
  button: {
    color: "#333333",
    paddingVertical: 20,
    marginVertical: 10,
    width: "100%",
    fontSize: 20
  }
});

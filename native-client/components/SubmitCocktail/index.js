import React, { useState } from "react";
import { View, Button, TextInput, Picker, StyleSheet } from "react-native";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const SUBMIT_COCKTAIL = gql`
  mutation(
    $name: String!
    $ingredients: String!
    $glass: String!
    $garnish: String
    $category: String!
    $preparation: String!
    $contact: String!
    $published: Boolean!
  ) {
    submitCocktail(
      name: $name
      ingredients: $ingredients
      glass: $glass
      garnish: $garnish
      category: $category
      preparation: $preparation
      contact: $contact
      published: $published
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
  const [values, setValues] = useState({
    name: "",
    glass: "",
    category: "",
    garnish: "",
    preparation: "",
    ingredients: "",
    contact: ""
  });

  const handleInputChange = prop => text => {
    const value = text.nativeEvent.text;
    setValues({ ...values, [prop]: value });
  };

  const handlePickerChange = prop => itemValue => {
    const value = itemValue;
    setValues({ ...values, [prop]: value });
  };

  const isButtonDisabled = () => {
    console.log(values.name.length);
    if (
      values.name.length > 0 &&
      values.preparation.length > 0 &&
      values.ingredients.length > 0 &&
      values.contact.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Mutation
      mutation={SUBMIT_COCKTAIL}
      variables={{
        name: values.name,
        ingredients: values.ingredients,
        glass: values.glass,
        garnish: values.garnish,
        category: values.category,
        preparation: values.preparation,
        contact: values.contact,
        published: false
      }}
      onCompleted={() => {
        props.history.push("/thank-you");
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
              placeholder="Cocktail Name"
              onChange={handleInputChange("name")}
            />
            <Picker
              style={styles.select}
              selectedValue={values.category}
              onValueChange={handlePickerChange("category")}
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
              selectedValue={values.glass}
              onValueChange={handlePickerChange("glass")}
              prompt="Glass"
            >
              <Picker.Item label="Glass" value="" />
              <Picker.Item label="Martini" value="Martini" />
              <Picker.Item label="Coupe" value="Coupe" />
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
              onChange={handleInputChange("ingredients")}
            />
            <TextInput
              style={styles.textArea}
              name="preparation"
              placeholder="Preparation"
              multiline={true}
              onChange={handleInputChange("preparation")}
            />
            <TextInput
              style={styles.textInput}
              type="text"
              placeholder="Garnish"
              name="granish"
              onChange={handleInputChange("garnish")}
            />
            <TextInput
              style={styles.textInput}
              type="text"
              placeholder="Your Contact Email"
              name="contact"
              onChange={handleInputChange("contact")}
            />
            <Button
              style={styles.button}
              onPress={addCocktail}
              title="Submit"
              disabled={isButtonDisabled()}
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

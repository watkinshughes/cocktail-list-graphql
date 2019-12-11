import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import styles from "./styles.module.css";

const ADD_COCKTAIL = gql`
  mutation(
    $name: String!
    $ingredients: String!
    $glass: String!
    $garnish: String
    $category: String!
    $preparation: String!
    $published: Boolean!
  ) {
    addCocktail(
      name: $name
      ingredients: $ingredients
      glass: $glass
      garnish: $garnish
      category: $category
      preparation: $preparation
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
  const [name, setName] = useState("");
  const [glass, setGlass] = useState("");
  const [category, setCategory] = useState("");
  const [garnish, setGarnish] = useState("");
  const [preparation, setPreparation] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleGlassChange = event => {
    setGlass(event.target.value);
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handleGarnishChange = event => {
    setGarnish(event.target.value);
  };

  const handlePreparationChange = event => {
    setPreparation(event.target.value);
  };

  const handleIngredientsChange = event => {
    setIngredients(event.target.value);
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
        preparation: preparation,
        // eventually published will be false by default
        published: true
      }}
      onCompleted={() => {
        props.history.push("/");
      }}
    >
      {(addCocktail, { loading, error }) => {
        if (loading) return null;
        if (error) return `Error: ${error}`;
        return (
          <form onSubmit={addCocktail} className={styles.form}>
            <label>
              <span className="visuallyHidden">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleNameChange}
              />
            </label>
            <label>
              <span className="visuallyHidden">Category</span>
              <select name="category" onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                <option value="Before Dinner Cocktail">
                  Before Dinner Cocktail
                </option>
                <option value="After Dinner Cocktail">
                  After Dinner Cocktail
                </option>
                <option value="All Day Cocktail">All Day Cocktail</option>
                <option value="Longdrink">Longdrink</option>
                <option value="Sparkling Cocktail">Sparkling Cocktail</option>
              </select>
            </label>
            <label>
              <span className="visuallyHidden">Glass</span>
              <select name="glass" onChange={handleGlassChange}>
                <option value="">Select Glass</option>
                <option value="Martini">Martini</option>
                <option value="Coupe">Coupe</option>
                <option value="Old-fashioned">Old-fashioned</option>
                <option value="Collins">Collins</option>
                <option value="Highball">Highball</option>
                <option value="Champagne">Champagne</option>
                <option value="Margarita">Margarita</option>
              </select>
            </label>
            <label>
              <span className="visuallyHidden">Ingredients</span>
              <textarea
                name="ingredients"
                placeholder="Ingredients"
                onChange={handleIngredientsChange}
              />
            </label>
            <label>
              <span className="visuallyHidden">Preparation</span>
              <textarea
                name="preparation"
                placeholder="Preparation"
                onChange={handlePreparationChange}
              />
            </label>
            <label>
              <span className="visuallyHidden">Garnish</span>
              <input
                type="text"
                placeholder="Garnish"
                name="granish"
                onChange={handleGarnishChange}
              />
            </label>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        );
      }}
    </Mutation>
  );
}

import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const ADD_COCKTAIL = gql`
  mutation {
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
          <form onSubmit={addCocktail}>
            <label>
              <span className="visually-hidden">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleNameChange}
              />
            </label>
            <label>
              <span className="visually-hidden">Category</span>
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
              <span className="visually-hidden">Glass</span>
              <select name="glass" onChange={handleGlassChange}>
                <option value="">Select Glass</option>
                <option value="martini">Martini</option>
                <option value="coup">Coup</option>
                <option value="old-fashioned">Old-fashioned</option>
                <option value="collins">Collins</option>
                <option value="highball">Highball</option>
                <option value="champagne">Champagne</option>
                <option value="margarita">Margarita</option>
              </select>
            </label>
            <label>
              <span className="visually-hidden">Garnish</span>
              <input
                type="text"
                placeholder="Garnish"
                name="granish"
                onChange={handleGarnishChange}
              />
            </label>
            <label>
              <span className="visually-hidden">Preparation</span>
              <textarea
                name="preparation"
                placeholder="Preparation"
                onChange={handlePreparationChange}
              />
            </label>
            <label>
              <span className="visually-hidden">Ingredients</span>
              <textarea
                name="ingredients"
                placeholder="Ingredients"
                onChange={handleIngredientsChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        );
      }}
    </Mutation>
  );
}

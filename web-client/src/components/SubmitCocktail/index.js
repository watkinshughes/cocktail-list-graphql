import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import styles from "./styles.module.css";

const SUBMIT_COCKTAIL = gql`
  mutation(
    $name: String!
    $ingredients: String!
    $glass: String!
    $garnish: String
    $category: String!
    $preparation: String!
    $contact: String!
    $imageUrl: String
    $slug: String!
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
      imageUrl: $imageUrl
      slug: $slug
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
    contact: "",
    imageUrl: "",
    slug: "",
    published: false,
    honey: ""
  });

  const handleInputChange = prop => event => {
    const value = event.target.value;
    setValues({ ...values, [prop]: value });
  };

  const isButtonDisabled = () => {
    if (
      values.honey.length === 0 &&
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
        imageUrl: "",
        slug: values.name.replace(/\s+/g, "-").toLowerCase(),
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
          <form onSubmit={addCocktail} className={styles.form}>
            <label>
              <span className="visuallyHidden">Cocktail Name</span>
              <input
                type="text"
                name="name"
                placeholder="Cocktail Name"
                onChange={handleInputChange("name")}
              />
            </label>
            <label>
              <span className="visuallyHidden">Category</span>
              <select name="category" onChange={handleInputChange("category")}>
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
              <select name="glass" onChange={handleInputChange("glass")}>
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
                onChange={handleInputChange("ingredients")}
              />
            </label>
            <label>
              <span className="visuallyHidden">Preparation</span>
              <textarea
                name="preparation"
                placeholder="Preparation"
                onChange={handleInputChange("preparation")}
              />
            </label>
            <label>
              <span className="visuallyHidden">Garnish</span>
              <input
                type="text"
                placeholder="Garnish"
                name="garnish"
                onChange={handleInputChange("garnish")}
              />
            </label>
            <label>
              <span className="visuallyHidden">Contact email</span>
              <input
                type="text"
                placeholder="Your Contact Email"
                name="contact"
                onChange={handleInputChange("contact")}
              />
            </label>
            <input
              type="hidden"
              name="honey"
              onChange={handleInputChange("honey")}
            />
            <button
              type="submit"
              className={styles.button}
              disabled={isButtonDisabled()}
            >
              Submit
            </button>
          </form>
        );
      }}
    </Mutation>
  );
}

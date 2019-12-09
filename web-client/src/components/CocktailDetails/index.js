import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styles from "./styles.module.css";

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

export default function CocktailDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_COCKTAIL_DETAILS, {
    variables: { id }
  });

  if (loading) {
    return (
      <div className="loading">
        <span className="visuallyHidden">Loading</span>
      </div>
    );
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <article className={styles.cocktailDetails}>
      <h1>{data.cocktail.name}</h1>
      <div className="displayLinebreak">{data.cocktail.ingredients}</div>
      <p>{data.cocktail.preparation}</p>
      <p>{data.cocktail.garnish}</p>
      <p>{data.cocktail.glass}</p>
      <h2>
        <em>{data.cocktail.category}</em>
      </h2>
      <Link to="/">← Back</Link>
    </article>
  );
}
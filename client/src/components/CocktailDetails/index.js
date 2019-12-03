import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import styles from "./styles.module.css";

const getCocktailDetails = gql`
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

export default function CocktailDetails(props) {
  return (
    <Query
      query={getCocktailDetails}
      variables={{
        id: props.match.params.id
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error: ${error}`;
        return (
          <article className={styles.cocktailDetails}>
            <h1>{data.cocktail.name}</h1>
            <div className="displayLinebreak">{data.cocktail.ingredients}</div>
            <p>{data.cocktail.preparation}</p>
            <p>{data.cocktail.garnish}</p>
            <h2>
              <em>{data.cocktail.category}</em>
            </h2>
            <Link to="/">← Back</Link>
          </article>
        );
      }}
    </Query>
  );
}

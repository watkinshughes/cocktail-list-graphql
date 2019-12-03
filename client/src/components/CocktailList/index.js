import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import Cocktail from "../Cocktail";
import styles from "./styles.module.css";

const GET_COCKTAIL_NAMES = gql`
  {
    cocktails {
      id
      name
    }
  }
`;

function CocktailList(props) {
  const displayCocktails = () => {
    const data = props.data;
    if (data.loading) {
      return (
        <div className="loading">
          <span className="visuallyHidden">Loading</span>
        </div>
      );
    } else {
      return data.cocktails.map(cocktail => {
        return (
          <Cocktail key={cocktail.id} id={cocktail.id} name={cocktail.name} />
        );
      });
    }
  };
  return (
    <section className={styles.cocktailList}>{displayCocktails()}</section>
  );
}

export default graphql(GET_COCKTAIL_NAMES)(CocktailList);

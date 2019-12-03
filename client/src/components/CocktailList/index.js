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
  const filterList = () => {
    return true;
  };

  const displayCocktails = data => {
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
    <section className={styles.cocktailList}>
      <form>
        <fieldset>
          <label>
            <span className="visuallyHidden">
              Filter by name or search by ingredient
            </span>
            <input
              type="text"
              className="Search"
              placeholder="Search by ingredient"
              onChange={filterList}
            />
          </label>
        </fieldset>
      </form>
      {displayCocktails(props.data)}
    </section>
  );
}

export default graphql(GET_COCKTAIL_NAMES)(CocktailList);

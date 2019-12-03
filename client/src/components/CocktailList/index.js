import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getCocktailsQuery = gql`
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
          <span className="visually-hidden">Loading</span>
        </div>
      );
    } else {
      return data.cocktails.map(cocktail => {
        return <li key={cocktail.id}>{cocktail.name}</li>;
      });
    }
  };
  return (
    <div>
      <ul id="cocktailList">{displayCocktails()}</ul>
    </div>
  );
}

export default graphql(getCocktailsQuery)(CocktailList);

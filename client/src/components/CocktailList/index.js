import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Cocktail from "../Cocktail";
import styles from "./styles.module.css";

const GET_COCKTAILS = gql`
  {
    cocktails {
      id
      name
      ingredients
    }
  }
`;

export default function CocktailList() {
  const { loading, error, data } = useQuery(GET_COCKTAILS);
  const [sortedData, setSortedData] = useState("");

  const sortData = data => {
    return data.sort(function(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  };

  useEffect(() => {
    if (data) {
      sortData(data.cocktails);
      setSortedData(data.cocktails);
    }
  }, [data]);

  const filterData = event => {
    if (sortedData) {
      const typedWord = new RegExp(`\\b${event.target.value.toLowerCase()}\\b`);
      const filteredData = sortedData.filter(node => {
        return (
          node.name.toLowerCase().search(typedWord) !== -1 ||
          node.ingredients.toLowerCase().search(typedWord) !== -1
        );
      });
      debugger;
      setSortedData(filteredData);
    }
  };

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
              onChange={filterData}
            />
          </label>
        </fieldset>
      </form>
      {sortedData ? (
        sortedData.map(cocktail => {
          return (
            <Cocktail key={cocktail.id} id={cocktail.id} name={cocktail.name} />
          );
        })
      ) : (
        <div />
      )}
    </section>
  );
}

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
    }
  }
`;

export default function CocktailList() {
  const { loading, error, data } = useQuery(GET_COCKTAILS);
  const [sortedData, setSortedData] = useState(false);

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
      setSortedData(true);
    }
  }, [data]);

  const filterData = event => {
    // const typedWord = event.target.value;
    debugger;
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
        data.cocktails.map(cocktail => {
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

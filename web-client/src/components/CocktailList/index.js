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
      slug
    }
  }
`;

export default function CocktailList() {
  const { loading, error, data } = useQuery(GET_COCKTAILS);
  const [initialData, setInitialData] = useState("");
  const [sortedData, setSortedData] = useState("");
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search)
  );
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

  const filterData = event => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    let typedWord = new RegExp(`\\b${event.target.value.toLowerCase()}\\b`);
    let filteredData = initialData;
    filteredData = filteredData.filter(cocktail => {
      return (
        cocktail.name.toLowerCase().search(typedWord) !== -1 ||
        cocktail.ingredients.toLowerCase().search(typedWord) !== -1
      );
    });
    setSortedData(filteredData);
    params.set("search", `${typedWord}`);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
    setSearchParams(window.location.search);
  };

  const restoreSearch = () => {
    const searchTerm = searchParams.get("search");
    if (searchTerm) {
      const searchBox = document.getElementById("search");
      searchBox.value = searchParams.get("search");
      searchBox.blur();
    }
  };

  useEffect(() => {
    if (data) {
      setInitialData(data.cocktails);
      sortData(data.cocktails);
      setSortedData(data.cocktails);
      restoreSearch();
    }
  }, [data]);

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
      <form className={styles.search}>
        <fieldset>
          <label>
            <span className="visuallyHidden">
              Filter by cocktail name or search by ingredient
            </span>
            <input
              type="text"
              className="search"
              id="search"
              placeholder="Filter by cocktail name or search by ingredient"
              onChange={filterData}
              onSubmit={filterData}
            />
          </label>
        </fieldset>
      </form>
      {sortedData ? (
        sortedData.map(cocktail => {
          return (
            <Cocktail
              key={cocktail.id}
              name={cocktail.name}
              slug={cocktail.slug}
              searchParams={searchParams}
            />
          );
        })
      ) : (
        <div />
      )}
    </section>
  );
}

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Cocktail from "../Cocktail";

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
  const [typedWordLength, setTypedWordLength] = useState(0);

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
    let filteredData = sortedData;
    const typedWord = event.target.value.toLowerCase();
    setTypedWordLength(typedWord.length);
    if (typedWordLength < typedWord.length) {
      filteredData = filteredData.filter(cocktail => {
        return (
          cocktail.name.toLowerCase().search(typedWord) !== -1 ||
          cocktail.ingredients.toLowerCase().search(typedWord) !== -1
        );
      });
      setSortedData(filteredData);
    } else {
      sortData(data.cocktails);
      setSortedData(data.cocktails);
    }
  };

  if (loading) {
    return (
      <View style="loading">
        <Text>Loading</Text>
      </View>
    );
  }
  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <View style={styles.cocktailList}>
      {/* <form>
        <fieldset>
          <label>
            <span>
              Filter by cocktail name or search by ingredient
            </span>
            <input
              type="text"
              style="Search"
              placeholder="Filter by cocktail name or search by ingredient"
              onChange={filterData}
            />
          </label>
        </fieldset>
      </form> */}
      {sortedData ? (
        sortedData.map(cocktail => {
          return (
            <Cocktail key={cocktail.id} id={cocktail.id} name={cocktail.name} />
          );
        })
      ) : (
        <Text />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cocktailList: {}
});

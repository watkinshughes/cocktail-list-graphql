import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, TextInput } from "react-native";
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
  const [initialData, setInitialData] = useState("");
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
      setInitialData(data.cocktails);
      sortData(data.cocktails);
      setSortedData(data.cocktails);
    }
  }, [data]);

  const filterData = text => {
    let typedWord = new RegExp(`\\b${text.nativeEvent.text.toLowerCase()}\\b`);
    let filteredData = initialData;
    filteredData = filteredData.filter(cocktail => {
      return (
        cocktail.name.toLowerCase().search(typedWord) !== -1 ||
        cocktail.ingredients.toLowerCase().search(typedWord) !== -1
      );
    });
    setSortedData(filteredData);
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
    <ScrollView>
      <TextInput
        style={styles.searchBox}
        type="text"
        placeholder="Filter by cocktail name or search by ingredient"
        onChange={filterData}
      />

      {sortedData ? (
        sortedData.map(cocktail => {
          return (
            <Cocktail key={cocktail.id} id={cocktail.id} name={cocktail.name} />
          );
        })
      ) : (
        <Text />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: "#fff",
    height: 40,
    padding: 10,
    margin: 10
  }
});

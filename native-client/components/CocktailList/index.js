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

  const filterData = text => {
    let filteredData = sortedData;
    const typedWord = text.nativeEvent.text;
    setTypedWordLength(typedWord.length);
    if (typedWordLength < typedWord.length) {
      filteredData = filteredData.filter(cocktail => {
        return (
          cocktail.name.search(typedWord) !== -1 ||
          cocktail.ingredients.search(typedWord) !== -1
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
    <ScrollView style={styles.cocktailList}>
      <TextInput
        style={styles.input}
        type="text"
        style="Search"
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
  input: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderColor: "gray",
    borderWidth: 1
  },
  cocktailList: {}
});

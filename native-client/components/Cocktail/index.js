import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";

export default function Cocktail(props) {
  return (
    <View style={styles.cocktail}>
      <Link to={props.id}>
        <Text>{props.name}</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  cocktail: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#fff"
  }
});

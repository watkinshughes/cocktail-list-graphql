import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Title from "../Title";

export default function Header() {
  return (
    <View style={styles.header}>
      <Link to="/" style={styles.homeLink}>
        <Text styles={styles.siteTitle}>Cocktail List</Text>
      </Link>
      <Link style={styles.menu} to="/add-cocktail">
        <Text style={styles.text}>Add cocktail</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  homeLink: {
    width: "50%",
    paddingVertical: 20,
    marginVertical: 10
  },
  siteTitle: {
    fontWeight: "600"
  },
  menu: {
    width: "50%",
    paddingVertical: 20,
    marginVertical: 10
  },
  text: {
    textAlign: "right"
  }
});

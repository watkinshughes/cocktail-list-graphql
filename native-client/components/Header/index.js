import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Link to="/" style={styles.homeLink}>
        <Text styles={styles.siteTitle}>A Proper List</Text>
      </Link>
      <Link style={styles.menu} to="/submit-cocktail">
        <Text style={styles.text}>Submit cocktail</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
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

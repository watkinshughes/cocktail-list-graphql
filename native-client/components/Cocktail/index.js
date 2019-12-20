import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "react-router-native";

export default function Cocktail(props) {
  return (
    <View style={styles.cocktail}>
      <Link to={props.slug}>
        <View style={styles.cocktailLink}>
          <Text style={styles.cocktailName}>{props.name} </Text>
          <Image
            style={styles.icon}
            source={require("../../assets/arrow-right.png")}
          />
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  cocktail: {
    marginVertical: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  cocktailLink: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  cocktailName: {
    fontWeight: "bold",
    width: "100%",
    alignSelf: "flex-start"
  },
  icon: {
    width: 10,
    height: 10,
    alignSelf: "flex-end",
    marginBottom: 5
  }
});

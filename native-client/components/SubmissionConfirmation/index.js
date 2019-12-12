import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";

export default function SubmissionConfirmation() {
  return (
    <View style={styles.thankyou}>
      <Text>Thank you for submitting your cocktail recipe!</Text>
      <Text>
        We will be in touch via email if we decide to add it to the list.
      </Text>
      <Link to="/">
        <Text>← Back</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  thankyou: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#ffffff"
  }
});

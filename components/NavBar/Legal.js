import React from "react";

import { View, Text, StyleSheet } from "react-native";

export default function Legal() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listItem: {
      paddingTop: 10,
      paddingBottom: 10,
      textAlignVertical: "center",
      textAlign: "center",
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Text>Enter Legal Information</Text>
    </View>
  );
}

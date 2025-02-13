import { View, Text, StyleSheet } from "react-native";
import React from "react";

type ItemProps = { title: string };
export default function CategoryItem({ title }: ItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f86669",
    padding: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginVertical: 10,
    marginHorizontal: 0,
    width: "auto",
    height: "auto",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
});

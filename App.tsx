import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Category from "./category/Category";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the finance manager app!</Text>
      <StatusBar style="auto" />
      <Category />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

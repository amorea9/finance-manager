import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Category from "./category/Category";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the finance manager app!</Text>
      <StatusBar style="auto" />
      <Category />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 30,
    marginTop: 70,
    textAlign: "center",
  },
});

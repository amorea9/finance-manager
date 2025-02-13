import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider/index";
import Category from "./src/category/Category";
import "./global.css";
import { Box } from "./components/ui/box";

export default function App() {
  return (
    <GluestackUIProvider>
      <SafeAreaView style={styles.container}>
        <Box style={{ marginTop: 30 }} className="flex gap-10 items-center bg-orange-100 w-screen">
          <Text style={styles.text} className="text-orange-500">
            Welcome to the finance manager app!
          </Text>
        </Box>
        <StatusBar style="auto" />
        <Category />
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 30,
    paddingTop: 40,
    paddingBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
});

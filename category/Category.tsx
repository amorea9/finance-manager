import { View, Text, TextInput, StyleSheet, Button, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { categoryType } from "./CategoryType";
import CategoryItem from "./CategoryItem";

export default function Category() {
  const [category, setCategory] = React.useState("");
  const [categoriesList, setCategoriesList] = React.useState([] as categoryType[]);

  const addCategory = () => {
    const newCategory = new categoryType(categoriesList.length, category);
    setCategoriesList([...categoriesList, newCategory]);
    setCategory("");
    console.log(categoriesList);
  };
  const removeCategory = (item: categoryType) => {
    const itemId = item.id;
    setCategoriesList(categoriesList.filter((item) => item.id !== itemId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create a new category:</Text>
      <TextInput style={styles.input} onChangeText={setCategory} value={category} placeholder="Enter a category name" />

      <TouchableOpacity onPress={addCategory} accessibilityLabel="Create a category" style={styles.button}>
        <Text style={styles.text}>Create</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Added categories: </Text>

      <FlatList
        data={categoriesList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeCategory(item)}>
            <CategoryItem title={item.title} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  container: {
    flex: 1,
    gap: 20,
    width: 300,
    height: 500,
    marginTop: 200,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f8e869",
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 50,
    height: "auto",
    width: 180,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 4,
  },
});

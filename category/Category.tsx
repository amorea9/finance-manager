import { View, Text, TextInput, StyleSheet, Button, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { categoryType } from "./CategoryType";
import CategoryItem from "./CategoryItem";

export default function Category() {
  const [category, setCategory] = React.useState("");
  const [categoriesList, setCategoriesList] = React.useState([] as categoryType[]);

  const createCategory = async () => {
    try {
      const response = await fetch("http://192.168.111.5:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: category }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const createdCategory = await response.json();
      addCategoryUI();
      return createdCategory;
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch("http://192.168.111.5:3000/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCategoriesList(data);
    } catch (error) {
      console.error("Error retrieving categories:", error);
    }
  };
  getCategories();

  const addCategoryUI = () => {
    const newCategory = new categoryType(categoriesList.length, category);
    setCategoriesList([...categoriesList, newCategory]);
    setCategory("");
    console.log(categoriesList);
  };

  const removeCategory = async (id: number) => {
    try {
      const response = await fetch(`http://192.168.111.5:3000/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const deletedCategory = await response.json();
      await getCategories();
      console.log("Category deleted", deletedCategory);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // const removeCategoryUI = (id: number) => {
  //   setCategoriesList(categoriesList.filter((item) => item.id !== id));
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Create a new category:</Text>
      <TextInput style={styles.input} onChangeText={setCategory} value={category} placeholder="Enter a category name" />

      <TouchableOpacity onPress={createCategory} accessibilityLabel="Create a category" style={styles.button}>
        <Text style={styles.text}>Create</Text>
      </TouchableOpacity>
      <SafeAreaView>
        <Text style={styles.text}>Added categories: </Text>

        <FlatList
          data={categoriesList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => removeCategory(item.id)}>
              <CategoryItem title={item.title} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </SafeAreaView>
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
    marginTop: 70,
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
    marginBottom: 20,
    height: "auto",
    width: 180,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 4,
  },
});

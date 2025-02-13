import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { categoryType } from "./CategoryType";
import CategoryItem from "./CategoryItem";
import { Input, InputField } from "@/components/ui/input";
import { Box } from "@/components/ui/box";

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

  return (
    <SafeAreaView style={styles.container}>
      {/* <TextInput style={styles.input} onChangeText={setCategory} value={category} placeholder="Enter a category name" /> */}

      <Box className="flex gap-10 items-center bg-orange-100 w-screen pt-8 pb-6">
        <Text style={styles.text} className="text-orange-500">
          Create a new category:
        </Text>
        <Box style={styles.input}>
          <Input isDisabled={false} isInvalid={false} isReadOnly={false}>
            <InputField placeholder="Enter a category name" type="text" value={category} onChangeText={setCategory} style={{ fontSize: 18 }} />
          </Input>
        </Box>

        <TouchableOpacity onPress={createCategory} accessibilityLabel="Create a category" style={styles.button}>
          <Text className="text-xl text-white font-bold">Create</Text>
        </TouchableOpacity>
      </Box>

      <Box className="flex gap-10 items-center bg-orange-100 w-screen pt-8 pb-6">
        <SafeAreaView className="flex gap-4 w-auto">
          <Text style={styles.text} className="text-orange-500">
            Added categories:
          </Text>

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
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: 300,
    margin: "auto",
    borderWidth: 1,
    borderColor: "lightgrey",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "white",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f86669",
    padding: 25,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 20,
    height: "auto",
    width: 200,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 8,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

import { useAppDB } from "@/database/db";
import { CategoryType } from "@/shared.types";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

type Props = {
  categoryType: CategoryType;
  onSelect: (selectedCategory: string, category_id: number) => void;
};

type SelectionDataProps = {
  key: number;
  value: string;
};

const CategorySelection = ({ categoryType = "expense", onSelect }: Props) => {
  const { getAllCategories } = useAppDB();
  const [categories, setCategories] = useState<SelectionDataProps[]>([]);

  const fetchCategory = async (categoryType: CategoryType) => {
    try {
      const result = await getAllCategories(categoryType);

      // We map into only the information needed by the dropdown
      const transformedData = result?.map((category) => ({
        key: category.id,
        value: category.name,
      }));

      setCategories(transformedData);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleSubmit = (selectedCategory: string) => {
    try {
      const selectedCategoryPair = categories.find(
        (obj) => obj.value === selectedCategory
      );

      if (!selectedCategoryPair)
        throw new Error("Invalid selection: No category id found");

      const category_id = selectedCategoryPair.key;
      onSelect(selectedCategory, category_id);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchCategory(categoryType);
  }, [categoryType]);

  return (
    <SelectList
      dropdownTextStyles={styles.dropdownText}
      dropdownStyles={styles.dropdown}
      inputStyles={styles.input}
      boxStyles={styles.box}
      setSelected={handleSubmit}
      data={categories as any[]} // We cast this into any[] because this library uses js
      search={false}
      placeholder={`Select an ${categoryType === "expense" ? "expense" : "income"} category`}
      save="value"
      arrowicon={
        <MaterialIcons name="keyboard-arrow-down" size={24} color={"white"} />
      }
    />
  );
};

const styles = StyleSheet.create({
  box: {
    height: 50,
  },
  input: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  dropdown: {
    backgroundColor: "black",
    color: "white",
  },
  dropdownText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CategorySelection;

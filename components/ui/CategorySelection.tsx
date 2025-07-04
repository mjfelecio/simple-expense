import { useAppDB } from "@/database/db";
import { CategoryType } from "@/shared.types";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

type Props = {
  categoryType: CategoryType;
  onSelect: (selectedCategory: string) => void;
};

type SelectionDataProps = {
  key: number;
  value: string;
};

const CategorySelection = ({ categoryType = "expense", onSelect }: Props) => {
  const { getAllExpenseCategories, getAllIncomeCategories } = useAppDB();
  const [categories, setCategories] = useState<SelectionDataProps[]>();

  const fetchCategory = async (categoryType: CategoryType) => {
    try {
      const result =
        categoryType === "expense"
          ? await getAllExpenseCategories()
          : await getAllIncomeCategories();

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

  useEffect(() => {
    fetchCategory(categoryType);
  }, [categoryType]);

  return (
    <View className="flex-1">
      <SelectList
        dropdownTextStyles={styles.dropdownText}
        dropdownStyles={styles.dropdown}
        inputStyles={styles.input}
        boxStyles={styles.box}
        setSelected={(val: string) => onSelect(val)}
        data={categories as any[]} // We cast this into any[] because this library uses js
        search={false}
        placeholder={`Select an ${categoryType === "expense" ? "expense" : "income"} category`}
        save="value"
        arrowicon={
          <MaterialIcons name="keyboard-arrow-down" size={24} color={"white"} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 50,
  },
  input: {
    color: "white",
  },
  dropdown: {
    backgroundColor: "black",
    color: "white",
  },
  dropdownText: {
    color: "white",
  },
});

export default CategorySelection;

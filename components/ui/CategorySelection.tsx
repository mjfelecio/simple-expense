import { useAppDB } from "@/database/db";
import { CategoryType } from "@/shared.types";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

type Props = {
  categoryType: CategoryType;
  onSelect: (selectedCategory: string, category_id: number) => void;
  selectedCategory?: string;
};

type SelectionDataProps = {
  key: number;
  value: string;
};

const CategorySelection = ({ categoryType, onSelect, selectedCategory }: Props) => {
  const { getAllCategories } = useAppDB();
  const [categories, setCategories] = useState<SelectionDataProps[]>([]);
  const [defaultOption, setDefaultOption] = useState<SelectionDataProps | undefined>(undefined);
  const hasUserSelected = useRef(false);
  const dropdownRef = useRef<SelectDropdown>(null);

  const fetchCategory = async (categoryType: CategoryType) => {
    try {
      const result = await getAllCategories(categoryType);
      const transformedData = result.map((category) => ({
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

  useEffect(() => {
    if (selectedCategory && categories.length > 0) {
      const match = categories.find((c) => c.value === selectedCategory);
      if (match) {
        setDefaultOption(match);
        // Set the default value in the dropdown
        const index = categories.findIndex((c) => c.value === selectedCategory);
        if (index !== -1 && dropdownRef.current) {
          dropdownRef.current.selectIndex(index);
        }
      } else {
        setDefaultOption(undefined);
      }
    } else {
      setDefaultOption(undefined);
    }
  }, [selectedCategory, categories]);

  const handleSubmit = (selectedItem: SelectionDataProps) => {
    if (!hasUserSelected.current) {
      return;
    }
    
    if (!selectedItem) {
      alert("Invalid selection: No category id found");
      return;
    }

    onSelect(selectedItem.value, selectedItem.key);
  };

  return (
    <SelectDropdown
      ref={dropdownRef}
      data={categories}
      onSelect={(selectedItem: SelectionDataProps) => {
        hasUserSelected.current = true;
        handleSubmit(selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.value) || 
               `Select an ${categoryType === "expense" ? "expense" : "income"} category`}
            </Text>
            <MaterialIcons 
              name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
              size={24} 
              color="white" 
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View style={{
            ...styles.dropdownItemStyle, 
            ...(isSelected && { backgroundColor: '#333' })
          }}>
            <Text style={styles.dropdownItemTxtStyle}>{item.value}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
      dropdownOverlayColor="rgba(0,0,0,0.5)"
      defaultValue={defaultOption}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  dropdownMenuStyle: {
    backgroundColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default CategorySelection;
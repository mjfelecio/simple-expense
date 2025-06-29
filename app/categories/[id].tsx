import CategoryRadioButton from "@/components/ui/CategoryRadioButton";
import ColorPickerModal from "@/components/ui/ColorPickerModal";
import IconCircle from "@/components/ui/IconCircle";
import IconPickerModal from "@/components/ui/IconPickerModal";
import { DEFAULT_ICON, DEFAULT_ICON_COLOR } from "@/constants/Defaults";
import { useAppDB } from "@/database/db";
import { Category, CategoryType, IconName } from "@/shared.types";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const EditCategoryForm = () => {
  const { getCategory, updateCategory, deleteCategory } = useAppDB();
  const { id } = useLocalSearchParams();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isIconModalVisible, setIsIconModalVisible] = useState(false);

  // Form States
  const [name, setName] = useState<string | undefined>();
  const [category, setCategory] = useState<CategoryType>("expense");
  const [iconColor, setIconColor] = useState<string>(DEFAULT_ICON_COLOR);
  const [selectedIcon, setSelectedIcon] = useState<IconName>(DEFAULT_ICON);

  useEffect(() => {
    const fetchCategory = async (categoryId: number) => {
      try {
        const data: Category | null = await getCategory(categoryId);
        if (data) {
          setName(data.name);
          setCategory(data.type);
          setIconColor(data.color);
          setSelectedIcon(data.icon);
        } else {
          alert("Category not found");
          router.back();
        }
      } catch (error) {
        console.error("Failed to fetch category:", error);
        alert("Failed to load category data");
        router.back();
      }
    };

    try {
      const categoryId = parseToInt(id);
      fetchCategory(categoryId);
    } catch (error) {
      alert("Invalid category ID");
      router.back();
    }
  }, [id]);

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const categoryID = parseToInt(id);
              await deleteCategory(categoryID);
              router.back(); // Navigate back after deletion
            } catch (error) {
              console.error("Failed to delete category:", error);
              alert("Failed to delete category");
            }
          },
        },
      ]
    );
  };

  const handleSubmit = async () => {
    if (!name || name.trim() === "") {
      alert("Name must be present");
      return;
    }

    let categoryID: number;
    try {
      categoryID = parseToInt(id);
    } catch (error) {
      alert("Invalid category ID");
      return;
    }

    try {
      const categoryData = {
        id: categoryID,
        name,
        type: category,
        color: iconColor,
        icon: selectedIcon,
      };

      await updateCategory(categoryData);
      router.back();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Check if error message contains UNIQUE constraint failure
      if (errorMessage.includes("UNIQUE constraint failed")) {
        alert(
          "A category with this name and type already exists. Please choose a different name or type."
        );
      } else {
        alert("Failed to update category. Please try again.");
      }
    }
  };

  return (
    <View className="flex-1 px-6">
      {/*=== Form === */}
      <View className="pt-6 gap-2">
        {/* Name */}
        <View>
          <Text className="text-white text-2xl font-semibold mb-2">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter category name"
            className="placeholder:text-gray-300 p-2 text-xl text-white border-2 border-white rounded-md"
          />
        </View>

        {/* Category Type */}
        <View>
          <Text className="text-white text-2xl font-semibold pt-2">Type</Text>
          <CategoryRadioButton initialValue={category} onSelect={setCategory} />
        </View>

        {/* Color */}
        <View>
          <Text className="text-white text-2xl font-semibold py-2">Color</Text>
          <View className="flex-row gap-2">
            {/* Selected Color */}
            <View
              style={{
                backgroundColor: iconColor,
                borderRadius: 99,
                width: 50,
                height: 50,
              }}
            ></View>
            {/* Select Color Button */}
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <IconCircle icon={"colorize"} color={"gray"} />
            </TouchableOpacity>
          </View>
          <ColorPickerModal
            visible={isModalVisible}
            initialColor={iconColor}
            onClose={(icon) => {
              setIconColor(icon);
              setIsModalVisible(false);
            }}
          />
        </View>

        {/* Icon */}
        <View>
          <Text className="text-white text-2xl font-semibold py-2">Icon</Text>
          <View className="flex-row gap-2">
            {/* Selected Icon */}
            <IconCircle icon={selectedIcon} color="transparent" />
            {/* Select Icon Button */}
            <TouchableOpacity onPress={() => setIsIconModalVisible(true)}>
              <IconCircle icon={"palette"} color={"gray"} />
            </TouchableOpacity>
          </View>
          <IconPickerModal
            visible={isIconModalVisible}
            onClose={(icon) => {
              setSelectedIcon(icon);
              setIsIconModalVisible(false);
            }}
            initialIcon={selectedIcon}
          />
        </View>
      </View>
      <View className="flex flex-row gap-4 self-end">
        {/* Delete Button */}
        <TouchableOpacity onPress={handleDelete} className=" mt-4">
          <IconCircle icon={"delete"} color={"red"} type="square" />
        </TouchableOpacity>
        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} className="mt-4">
          <IconCircle icon={"save"} color={"gray"} type="square" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditCategoryForm;

function parseToInt(value: string | string[]): number {
  let strValue: string;

  if (Array.isArray(value)) {
    strValue = value[0];
  } else {
    strValue = value;
  }

  const parsed = parseInt(strValue, 10);

  if (isNaN(parsed)) {
    throw new Error("Invalid id parameter");
  }

  return parsed;
}

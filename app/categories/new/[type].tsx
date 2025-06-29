import CategoryRadioButton from "@/components/ui/CategoryRadioButton";
import ColorPickerModal from "@/components/ui/ColorPickerModal";
import IconCircle from "@/components/ui/IconCircle";
import IconPickerModal from "@/components/ui/IconPickerModal";
import { DEFAULT_ICON, DEFAULT_ICON_COLOR } from "@/constants/Defaults";
import { useAppDB } from "@/database/db";
import { CategoryType, IconName } from "@/shared.types";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const AddCategoryForm = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Add Category",
      headerTitleStyle: {
        fontSize: 24,
      },
    });
  }, [navigation]);

  const { addCategory } = useAppDB();
  const { type } = useLocalSearchParams();

  // Aborts navigation if the type is invalid
  if (type !== "expense" && type !== "income") {
    alert("Invalid category type");
    router.back();
  }

  // Parses the type param into the valid category types
  const initialCategory = type === "expense" ? "expense" : "income";

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isIconModalVisible, setIsIconModalVisible] = useState(false);

  // Form States
  const [name, setName] = useState<string | undefined>();
  const [category, setCategory] = useState<CategoryType>(initialCategory);
  const [iconColor, setIconColor] = useState<string>(DEFAULT_ICON_COLOR);
  const [selectedIcon, setSelectedIcon] = useState<IconName>(DEFAULT_ICON);

  const handleSubmit = async () => {
    if (!name || name.trim() === "") {
      alert("Name must be present");
      return;
    }

    try {
      const categoryData = {
        name,
        type: category,
        color: iconColor,
        icon: selectedIcon,
      };

      await addCategory(categoryData);
      router.back();
    } catch (error) {
      console.error(
        "Failed to add category:",
        error instanceof Error ? error.message : error
      );
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
        {/* Cancel Button */}
        <TouchableOpacity onPress={router.back} className=" mt-4">
          <IconCircle icon={"close"} color={"gray"} type="square" />
        </TouchableOpacity>
        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} className="mt-4">
          <IconCircle icon={"save"} color={"gray"} type="square" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCategoryForm;

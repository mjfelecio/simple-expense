import CategoryRadioButton from "@/components/ui/CategoryRadioButton";
import ColorPickerModal from "@/components/ui/ColorPickerModal";
import IconCircle from "@/components/ui/IconCircle";
import { Category } from "@/shared.types";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryDetails = () => {
  const { id } = useLocalSearchParams();
  const isEdit = id !== "new";

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Form States
  const [name, setName] = useState<string | undefined>();
  const [category, setCategory] = useState<Category | undefined>();
  const [iconColor, setIconColor] = useState<string>("#A9A9A9"); // Default color

  const handleColorPickerClose = (value: string) => {
    setIconColor(value);
    setIsModalVisible(false);
  };

  // Testing purposes only
  const logState = () => {
    alert(`Name: ${name} Category: ${category}`);
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      {/* Header */}
      <Text className="text-white text-3xl font-semibold">
        {isEdit ? "Edit" : "Add"} Category
      </Text>
      {/* Form */}
      <View className="pt-6 gap-2">
        {/* Name */}
        <View>
          <Text className="text-white text-2xl font-semibold">Name</Text>
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
          <CategoryRadioButton onSelect={setCategory} />
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
            onClose={handleColorPickerClose}
          />
        </View>
      </View>
      {/* Logging the form states for testing */}
      <TouchableOpacity
        className="absolute bottom-10 right-10"
        onPress={logState}
      >
        <IconCircle icon={"logo-dev"} color={"gray"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CategoryDetails;

import CategoryRadioButton from "@/components/ui/CategoryRadioButton";
import IconCircle from "@/components/ui/IconCircle";
import { Category } from "@/shared.types";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryDetails = () => {
  const { id } = useLocalSearchParams();
  const isEdit = id !== "new";

  // Form States
  const [name, setName] = useState<string | undefined>();
  const [category, setCategory] = useState<Category | undefined>();

  // Testing purposes only
  const logState = () => {
    alert(`Name: ${name} Category: ${category}`)
  }

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
            <View className="bg-[#0FF] rounded-full size-[50px]"></View>
            {/* Select Color Button */}
            <TouchableOpacity onPress={() => alert("Pick color")}>
              <IconCircle icon={"colorize"} color={"gray"} />
            </TouchableOpacity>
          </View>
          {/* <ColorPicker /> */}
        </View>
      </View>
      {/* Logging the form states for testing */}
      <TouchableOpacity className="absolute bottom-10 right-10" onPress={logState}>
        <IconCircle icon={"logo-dev"} color={"gray"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CategoryDetails;

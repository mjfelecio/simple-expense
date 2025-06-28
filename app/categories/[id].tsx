import CategoryRadioButton from "@/components/ui/CategoryRadioButton";
import IconCircle from "@/components/ui/IconCircle";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryDetails = () => {
  const { id } = useLocalSearchParams();
  const isEdit = id !== "new";

  return (
    <SafeAreaView className="p-4">
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
            placeholder="Enter category name"
            className="placeholder:text-gray-300 p-2 text-xl text-white border-2 border-white rounded-md"
          />
        </View>
        {/* Category Type */}
        <View>
          <Text className="text-white text-2xl font-semibold pt-2">Type</Text>
          <CategoryRadioButton />
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
    </SafeAreaView>
  );
};

export default CategoryDetails;

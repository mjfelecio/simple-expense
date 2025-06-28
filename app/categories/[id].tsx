import CategoryRadioButton from "@/components/ui/CategoryRadioButton";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, TextInput, View } from "react-native";
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
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetails;

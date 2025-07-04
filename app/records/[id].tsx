import CategoryRadioButton from "@/components/ui/CategoryRadioButton";
import CategorySelection from "@/components/ui/CategorySelection";
import IconCircle from "@/components/ui/IconCircle";
import { CategoryType } from "@/shared.types";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const RecordForm = () => {
  const { id } = useLocalSearchParams();

  const isCreatingRecord: boolean = id === "new";

  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [categoryType, setCategoryType] = useState<CategoryType>("expense");
  const [category, setCategory] = useState<string>("");

  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [rawDate, setRawDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(formatDate(new Date()));

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }

  const handleDatePicker = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      setRawDate(selectedDate);
      setFormattedDate(formatDate(selectedDate));
    }
    setIsDatePickerOpen(false);
  };

  const handleSubmit = async () => {
    console.log("==> Submitted <==")
    console.log("Name: " + name)
    console.log("Amount: " + amount)
    console.log("Date: " + formattedDate)
    console.log("Category: " + category)
  }

  return (
    <View className="flex-1 px-6 pt-10 gap-6">
      {/* Name */}
      <View className="gap-2">
        <Text className="text-white text-2xl font-semibold">Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          className="placeholder:text-gray-200 placeholder:text-xl p-2 text-white border-b-2 border-white"
        />
      </View>

      {/* Amount */}
      <View className="gap-2">
        <Text className="text-white text-2xl font-semibold">Amount</Text>
        <TextInput
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          className="placeholder:text-gray-200 placeholder:text-xl p-2 text-white border-b-2 border-white"
        />
      </View>

      {/* Date */}
      <View className="gap-2">
        <Text className="text-white text-2xl font-semibold">Date</Text>
        <TouchableOpacity
          onPress={() => setIsDatePickerOpen(true)}
          className="text-xl p-2 text-white border-b-2 border-white"
        >
          <Text className="text-white text-xl font-semibold">
            {formattedDate}
          </Text>
        </TouchableOpacity>
        {isDatePickerOpen && (
          <DateTimePicker
            value={rawDate}
            display="spinner"
            onChange={handleDatePicker}
          />
        )}
      </View>

      {/* Select Category Type */}
      <View className="gap-2">
        <Text className="text-white text-2xl font-semibold">Type</Text>
        <CategoryRadioButton
          initialValue="expense"
          onSelect={(selectedType) => setCategoryType(selectedType)}
        />
      </View>

      {/* Category */}
      <View className="gap-2">
        <Text className="text-white text-2xl font-semibold">Category</Text>
        <CategorySelection
          categoryType={categoryType}
          onSelect={(selectedCategory) => setCategory(selectedCategory)}
        />
      </View>

      {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} className="absolute bottom-20 right-10">
          <IconCircle icon={"save"} color={"gray"} type="square" />
        </TouchableOpacity>
    </View>
  );
};

export default RecordForm;

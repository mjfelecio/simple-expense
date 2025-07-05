import CategoryRadioButton from "@/components/ui/CategoryRadioButton";
import CategorySelection from "@/components/ui/CategorySelection";
import IconCircle from "@/components/ui/IconCircle";
import { useAppDB } from "@/database/db";
import { CategoryType, RealRecord } from "@/shared.types";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const RecordForm = () => {
  const { id } = useLocalSearchParams();
  const { addRecord, updateRecord, getRecord, getCategory } = useAppDB();

  const isCreatingRecord: boolean = id === "new";

  // Forms states
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [categoryType, setCategoryType] = useState<CategoryType>("expense");
  const [category, setCategory] = useState<string>("");

  // 0 as the default value to make Typescript shut up about undefined
  // categoryId wont ever be invalid anyways. I think...
  const [categoryId, setCategoryId] = useState<number>(0);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [rawDate, setRawDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(formatDate(new Date()));

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
    // TODO: Move this validation to another function
    if (!name || name.trim() === "") {
      alert("Name must be present");
      return;
    }

    const numericAmount = Number(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Amount must be a valid number greater than 0");
      return;
    }

    if (!category || categoryId === 0) {
      alert("Please select a valid category");
      return;
    }

    try {
      if (isCreatingRecord) {
        // We omit the id because it isn't populated yet
        const recordData: Omit<RealRecord, "id"> = {
          name: name.trim(),
          amount: numericAmount,
          date: rawDate.toDateString(),
          category_id: categoryId,
        };

        await addRecord(recordData);
      } else {
        const recordData: RealRecord = {
          id: Number(id),
          name: name.trim(),
          amount: numericAmount,
          date: rawDate.toDateString(),
          category_id: categoryId,
        };

        await updateRecord(recordData);
      }

      router.back();
    } catch (error) {
      alert("Failed to add record. Please try again.");
      console.error(error);
    }
  };

  const fetchRecordData = async (recordId: number) => {
    try {
      const result = await getRecord(recordId);

      if (!result) {
        throw new Error("Failed in fetching record data");
      }

      const resultCategory = await getCategory(result.category_id);

      if (!resultCategory) {
        throw new Error("Failed in fetching category of record");
      }

      setName(result.name);
      setAmount(String(result.amount));
      setRawDate(new Date(result.date));
      setFormattedDate(formatDate(new Date(result.date)));
      setCategoryType(resultCategory.type);
      setCategory(resultCategory.name);
      setCategoryId(result.category_id);
    } catch (error) {
      console.error(error);
      alert("Fetching record data failed");
    }
  };

  useEffect(() => {
    if (!isCreatingRecord) {
      fetchRecordData(Number(id));
    }
  }, [id, isCreatingRecord]);

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
          initialValue={categoryType}
          onSelect={(selectedType) => setCategoryType(selectedType)}
        />
      </View>

      {/* Category */}
      <View className="gap-2">
        <Text className="text-white text-2xl font-semibold">Category</Text>
        <CategorySelection
          selectedCategory={category}
          categoryType={categoryType}
          onSelect={(selectedCategory, category_id) => {
            setCategory(selectedCategory);
            setCategoryId(category_id);
          }}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="absolute bottom-20 right-10"
      >
        <IconCircle icon={"save"} color={"gray"} type="square" />
      </TouchableOpacity>
    </View>
  );
};

export default RecordForm;

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}
import { CategoryType } from "@/shared.types";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

const CategoryRadioButton = ({
  onSelect,
  initialValue
}: {
  onSelect: (value: CategoryType) => void;
  initialValue: CategoryType;
}) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(initialValue);

  const radioButtons = useMemo<RadioButtonProps[]>(
    () => [
      {
        id: "expense",
        label: "Expense",
        value: "expense",
        color: "#0FF",
        borderColor: selectedId === "expense" ? "#0FF" : "#CCC",
      },
      {
        id: "income",
        label: "Income",
        value: "income",
        color: "#0FF",
        borderColor: selectedId === "income" ? "#0FF" : "#CCC",
      },
    ],
    [selectedId]
  );

  function isCategory(value: string): value is CategoryType {
    return ["expense", "income"].includes(value);
  }

  const handleSelect = (value: string) => {
    if (isCategory(value)) {
      setSelectedId(value);
      onSelect(value);
    }
  };

  useEffect(() => {
    setSelectedId(initialValue)
  }, [initialValue])

  return (
    <RadioGroup
      radioButtons={radioButtons}
      onPress={handleSelect}
      selectedId={selectedId}
      layout="row"
      labelStyle={styles.label}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontSize: 16,
  },
});

export default CategoryRadioButton;

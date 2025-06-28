import { Category } from "@/shared.types";
import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

const CategoryRadioButton = ({
  onSelect,
}: {
  onSelect: (value: Category) => void;
}) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

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

  function isCategory(value: string): value is Category {
    return ["expense", "income"].includes(value);
  }

  const handleSelect = (value: string) => {
    if (isCategory(value)) {
      setSelectedId(value);
      onSelect(value);
    }
  };

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

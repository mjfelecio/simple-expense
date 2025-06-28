import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

const CategoryRadioButton = () => {
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

  return (
    <RadioGroup
      radioButtons={radioButtons}
      onPress={setSelectedId}
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

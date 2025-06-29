import { Record } from "@/shared.types";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import IconCircle from "./IconCircle";

const RecordCard = ({ icon, iconColor, name, value, type }: Record) => {
  const sign = type === "expense" ? "-" : ""

  return (
    <TouchableHighlight onPress={() => alert(`Clicked ${name} record`)}>
      <View className="flex flex-row items-center gap-4 p-4">
        <IconCircle icon={icon} color={iconColor} iconSize={26} circleSize={38} />
        <Text className="text-white text-xl font-medium">{name}</Text>
        <View className="flex-1"></View>
        <Text className="text-white text-xl font-medium">{sign + value}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default RecordCard;

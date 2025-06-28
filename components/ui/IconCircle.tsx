import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor?: string;
  iconSize?: number;
  color: string;
  circleSize?: number;
  className?: string;
};

const IconCircle = ({ icon, iconSize, color, circleSize, className }: Props) => {
  return (
    <View className={className}>
      <View
        style={{
          backgroundColor: color,
          width: circleSize ?? 50,
          height: circleSize ?? 50,
          borderRadius: 99
        }}
        className={"flex justify-center items-center"}
      >
        <MaterialIcons size={iconSize ?? 30} name={icon} color={"white"} />
      </View>
    </View>
  );
};

export default IconCircle;

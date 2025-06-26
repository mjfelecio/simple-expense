import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  circleSize?: number;
  iconSize?: number;
};

const IconCircle = ({ icon, iconSize, color, circleSize }: Props) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: color,
          width: circleSize ?? 50,
          height: circleSize ?? 50,
        }}
        className={"rounded-full flex justify-center items-center"}
      >
        <MaterialIcons size={iconSize ?? 30} name={icon} color={"white"} />
      </View>
    </View>
  );
};

export default IconCircle;

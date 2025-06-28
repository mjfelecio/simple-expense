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
  type?: "circle" | "square";
};

const IconCircle = ({
  icon,
  iconSize,
  color,
  circleSize,
  className,
  type
}: Props) => {

  // This is abomination
  // TODO: Refactor this to be like an IconBadge that allows for more customization
  // than this hacky bs
  const iconContainerStyle = type !== "square"
  ? 
  {
    backgroundColor: color,
    width: circleSize ?? 50,
    height: circleSize ?? 50,
    borderRadius: 99,
  } : {
    backgroundColor: color,
    width: circleSize ?? 50,
    height: circleSize ?? 50,
    borderRadius: 12,
  };

  return (
    <View className={className}>
      <View style={iconContainerStyle} className={"flex justify-center items-center"}>
        <MaterialIcons size={iconSize ?? 30} name={icon} color={"white"} />
      </View>
    </View>
  );
};

export default IconCircle;

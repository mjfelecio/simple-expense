import { IconName } from "@/shared.types";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import IconCircle from "./IconCircle";

const ICONS: IconName[] = [
  "help-outline",
  "account-balance",
  "attach-money",
  "shopping-cart",
  "restaurant",
  "local-gas-station",
  "local-hospital",
  "school",
  "directions-car",
  "info-outline",
  "home",
  "work",
  "local-mall",
  "sports-esports",
  "pets",
  "flight",
  "local-cafe",
  "savings",
  "credit-card",
  "car-repair",
  "fitness-center",
];

type Props = {
  visible: boolean;
  onClose: (value: IconName) => void;
  initialIcon: IconName;
};

export default function IconPickerModal({
  visible,
  onClose,
  initialIcon,
}: Props) {
  const [selectedIcon, setSelectedIcon] = useState<IconName>(initialIcon);

  const handleIconSelect = (iconName: string) => {
    if (isMaterialIcons(iconName)) {
      setSelectedIcon(iconName);
    }
  };

  // Guard function to make sure the string is a valid Material Icon
  function isMaterialIcons(value: string): value is IconName {
    return Object.keys(MaterialIcons.glyphMap).includes(value);
  }

  return (
      <View>
        <Modal animationType="slide" visible={visible} transparent={true}>
          <View className="absolute bottom-0 min-w-full bg-gray-900 rounded-t-2xl">
            <View className="flex flex-row items-center justify-between bg-gray-800 px-4 py-3 rounded-t-xl">
              <Text className="text-2xl font-bold text-white flex-1">
                Select Icon
              </Text>
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  className="opacity-70 hover:opacity-100"
                  onPress={() => onClose(initialIcon)}
                >
                  <IconCircle
                    icon="close"
                    color="transparent"
                    circleSize={38}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="opacity-70 hover:opacity-100"
                  onPress={() => onClose(selectedIcon)}
                >
                  <IconCircle icon="save" color="transparent" circleSize={38} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              className="max-h-[400px] p-4"
              contentContainerClassName="flex-row flex-wrap justify-center pb-8 gap-4"
            >
              {ICONS.map((iconName) => (
                <TouchableOpacity
                  key={iconName}
                  className={`
										w-[100px] h-[100px] 
										items-center justify-center 
										rounded-xl 
										${
											selectedIcon === iconName
												? "bg-blue-500/30"
												: "bg-gray-700/30"
										}
									`}
                  onPress={() => handleIconSelect(iconName)}
                >
                  <MaterialIcons
                    name={iconName}
                    size={50}
                    color={selectedIcon === iconName ? "#3B82F6" : "white"}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
  );
}

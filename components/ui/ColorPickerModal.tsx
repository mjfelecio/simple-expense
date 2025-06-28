import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import type { ColorFormatsObject } from "reanimated-color-picker";
import ColorPicker, {
  OpacitySlider,
  Panel5,
  PreviewText,
} from "reanimated-color-picker";
import IconCircle from "./IconCircle";

type Props = {
  visible: boolean;
  onClose: (value: string) => void;
  initialColor: string;
};

export default function ColorPickerModal({
  visible,
  onClose,
  initialColor,
}: Props) {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const currentColor = useSharedValue(initialColor);

  // runs on the ui thread on color change
  const onColorChange = (color: ColorFormatsObject) => {
    "worklet";
    currentColor.value = color.hex;
  };

  // runs on the js thread on color pick
  const onColorPick = (color: ColorFormatsObject) => {
    setSelectedColor(color.hex);
  };

  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <View
        className="absolute bottom-0 min-w-full rounded-t-3xl"
        style={{ backgroundColor: selectedColor }}
      >
        <View className="flex flex-row items-center justify-between bg-gray-800 px-4 py-3 rounded-t-xl">
          <Text className="text-2xl font-bold text-white flex-1">
            Select Icon Color
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="opacity-70 hover:opacity-100"
              onPress={() => onClose(initialColor)}
            >
              <IconCircle icon="close" color="transparent" circleSize={38} />
            </TouchableOpacity>
            <TouchableOpacity
              className="opacity-70 hover:opacity-100"
              onPress={() => onClose(selectedColor)}
            >
              <IconCircle icon="save" color="transparent" circleSize={38} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="self-center w-[300px] bg-gray-100 p-5 rounded-2xl my-4 shadow-md">
          <ColorPicker
            value={selectedColor}
            sliderThickness={25}
            thumbSize={24}
            thumbShape="circle"
            onChange={onColorChange}
            onCompleteJS={onColorPick}
          >
            <View className="gap-4">
              <Panel5 />
              <OpacitySlider adaptSpectrum />
              <View className="h-[1px] bg-gray-300" />
              <PreviewText colorFormat="hex" />
            </View>
          </ColorPicker>
        </View>
      </View>
    </Modal>
  );
}

import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
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
        className="absolute bottom-0 min-w-full"
        style={{ backgroundColor: selectedColor }}
      >
        {/* Close Modal Button - return back the initial color */}
        <TouchableOpacity
          className="absolute top-2 right-2"
          onPress={() => onClose(initialColor)}
        >
          <IconCircle icon={"close"} color={"gray"} circleSize={42} />
        </TouchableOpacity>
        {/* Save Selection Button - return the selected color */}
        <TouchableOpacity
          className="absolute top-16 right-2"
          onPress={() => onClose(selectedColor)}
        >
          <IconCircle icon={"save"} color={"gray"} circleSize={42} />
        </TouchableOpacity>
        <View style={colorPickerStyle.pickerContainer}>
          <ColorPicker
            value={selectedColor}
            sliderThickness={25}
            thumbSize={24}
            thumbShape="circle"
            onChange={onColorChange}
            onCompleteJS={onColorPick}
            style={colorPickerStyle.picker}
          >
            <Panel5
              style={[colorPickerStyle.panelStyle, { borderRadius: 4 }]}
            />
            <OpacitySlider style={colorPickerStyle.sliderStyle} adaptSpectrum />
            <View style={{ height: 1, backgroundColor: "#bebdbe" }} />
            <PreviewText
              style={colorPickerStyle.previewTxt}
              colorFormat="hsla"
            />
          </ColorPicker>
        </View>
      </View>
    </Modal>
  );
}

const colorPickerStyle = StyleSheet.create({
  title: {
    textAlign: "center",
    fontFamily: "Quicksand",
    fontWeight: "bold",
    marginVertical: 20,
  },
  picker: {
    gap: 20,
  },
  pickerContainer: {
    alignSelf: "center",
    width: 300,
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  panelStyle: {
    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderVerticalStyle: {
    borderRadius: 20,
    height: 300,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderTitle: {
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
    paddingHorizontal: 4,
    fontFamily: "Quicksand",
  },
  previewStyle: {
    height: 40,
    borderRadius: 14,
  },
  previewTxt: {
    color: "#707070",
    fontFamily: "Quicksand",
  },
  inputStyle: {
    color: "#707070",
    paddingVertical: 2,
    borderColor: "#707070",
    fontSize: 12,
    marginLeft: 5,
  },
  swatchesContainer: {
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

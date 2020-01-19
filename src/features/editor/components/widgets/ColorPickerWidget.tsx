import React, { ReactElement } from "react";
import { EditorWidget, EditorWidgetProps } from "./widget.model";
import { SketchPicker, ColorResult } from "react-color";

interface Props extends EditorWidgetProps {}

export const ColorPickerWidget: EditorWidget = (props: Props): ReactElement => {
  const handleColorSelection = ({ hex }: ColorResult) =>
    props.handleValueSelection(hex);

  return <SketchPicker onChangeComplete={handleColorSelection} />;
};

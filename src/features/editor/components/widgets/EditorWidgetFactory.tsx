import { EditorWidget, EditorWidgets, EditorWidgetProps } from "./widget.model";
import { ColorPickerWidget } from "./ColorPickerWidget";
import { SynonymsPickerWidget } from "./SynonymsPickerWidget";
import React from "react";
import { Nillable } from "../../models";
import { InputWidget } from "./InputWidget";

export function EditorWidgetFactory<T = {}>(
  widgetKey: Nillable<EditorWidgets>,
  props: EditorWidgetProps
): EditorWidget | JSX.Element {
  switch (widgetKey) {
    case EditorWidgets.ColorPicker:
      return <ColorPickerWidget {...props} />;
    case EditorWidgets.SynonymsPicker:
      return <SynonymsPickerWidget {...props} />;
    case EditorWidgets.Input:
      return <InputWidget {...props} />;
    default:
      return <div>No Specified Widget</div>;
  }
}

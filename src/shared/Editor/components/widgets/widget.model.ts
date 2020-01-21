import { ReactElement } from "react";

export interface EditorWidgetProps<T = string> {
  selectedValue: T;
  handleValueSelection: (value: T) => void;
}

export type EditorWidget = <T extends EditorWidgetProps>(
  props: T
) => ReactElement;

export enum EditorWidgets {
  ColorPicker = "color-picker",
  SynonymsPicker = "synonyms-picker",
  Input = "input"
}

import { Formatting, FormattingTypes } from "./models";
import { EditorWidgets } from "./components/widgets/widget.model";

export const FORMATTINGS: Formatting[] = [
  {
    key: "bold",
    icon: "format_bold",
    prop: "style.fontWeight",
    appliedValue: "bold",
    type: FormattingTypes.Toggler,
    description: "Bold"
  },
  {
    key: "italic",
    icon: "format_italic",
    prop: "style.fontStyle",
    appliedValue: "italic",
    type: FormattingTypes.Toggler,
    description: "Italic"
  },
  {
    key: "underlined",
    icon: "format_underlined",
    prop: "style.textDecoration",
    appliedValue: "underline",
    type: FormattingTypes.Toggler,
    description: "Underlined"
  },
  {
    key: "background",
    prop: "style.background",
    icon: "color_lens",
    type: FormattingTypes.Widget,
    widgetType: EditorWidgets.ColorPicker,
    description: "Change Background Color"
  },
  {
    key: "color",
    prop: "style.color",
    icon: "text_format",
    type: FormattingTypes.Widget,
    widgetType: EditorWidgets.ColorPicker,
    description: "Change Font Color"
  },
  {
    key: "synonym",
    icon: "edit",
    prop: "innerText",
    type: FormattingTypes.Widget,
    widgetType: EditorWidgets.SynonymsPicker,
    description: "Pick synonym from list"
  },
  {
    key: "fontSize",
    icon: "format_size",
    prop: "style.fontSize",
    type: FormattingTypes.Widget,
    widgetType: EditorWidgets.Input,
    description: "Change Font Size (10px, 1em, etc)"
  }
].map((formattings, index) => ({ ...formattings, index, value: "" }));

export const isTogglerFormatting = ({ type }: Formatting) =>
  type === FormattingTypes.Toggler;

import { Formatting } from "./models";

export const FORMATTINGS: Formatting[] = [
  {
    key: "bold",
    icon: "format_bold",
    style: "fontWeight",
    value: "",
    appliedValue: "bold",
    type: "toggler"
  },
  {
    key: "italic",
    icon: "format_italic",
    style: "fontStyle",
    value: "",
    appliedValue: "italic",
    type: "toggler"
  },
  {
    key: "underlined",
    icon: "format_underlined",
    style: "textDecoration",
    value: "",
    appliedValue: "underline",
    type: "toggler"
  },
  {
    key: "background",
    style: "background",
    value: "",
    type: "widget"
  },
  {
    key: "color",
    style: "color",
    value: "",
    type: "widget"
  },
  {
    key: "synonym",
    icon: "edit",
    property: "innerText",
    value: "",
    appliedValue: "underlined",
    type: "widget"
  }
];

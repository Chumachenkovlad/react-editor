import { get } from "lodash";
import { Formatting } from "./models";

export function getWordValue(
  element: HTMLElement,
  formatting: Formatting
): string {
  const { property, style } = formatting;
  if (property) {
    return get(element, property);
  }
  return get(element, `style.${style}`);
}

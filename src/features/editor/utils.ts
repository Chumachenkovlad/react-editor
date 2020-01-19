import { Formatting } from "./models/formatting";
import { set } from "lodash";

export const isEnterKeyEvent = <T extends KeyboardEvent>(event: T): boolean => {
  return event.key === "Enter";
};

export const isEscKeyEvent = <T extends KeyboardEvent>(event: T): boolean => {
  return event.key === "Esc";
};

export function applyFormatting(
  element: HTMLElement,
  { prop, value }: Formatting
) {
  const [property, style] = prop.split(".");

  if (style) {
    return set(element.style, style, value);
  }

  set(element, property, value);
}

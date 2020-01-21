import { Formatting, Nillable } from "../models";
import { set } from "lodash";

export function applyFormatting(
  element: Nillable<HTMLElement>,
  { prop, value }: Formatting
) {
  if (!element) {
    return;
  }

  const [property, style] = prop.split(".");

  if (style) {
    return set(element.style, style, value);
  }

  set(element, property, value);
}

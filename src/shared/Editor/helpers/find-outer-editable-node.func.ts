import { Nillable } from "../models";
import {
  TEXTAREA_CONTAINER_CLASS,
  EDITABLE_CLASS
} from "../constants/constants";

export function findOuterEditableNode(
  element: HTMLElement,
  count = 0
): Nillable<HTMLElement> {
  const parent = element.parentElement;
  if (!parent || count > 2) {
    return null;
  }

  if (element.classList.contains(TEXTAREA_CONTAINER_CLASS)) {
    return element;
  }

  if (parent.classList.contains(TEXTAREA_CONTAINER_CLASS)) {
    return element.classList.contains(EDITABLE_CLASS) ? element : parent;
  } else {
    return findOuterEditableNode(parent, ++count);
  }
}

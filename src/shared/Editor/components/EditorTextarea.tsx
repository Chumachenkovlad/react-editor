import * as React from "react";
import { get, debounce } from "lodash";
import { EDITABLE_CLASS } from "../constants/constants";
import { findOuterEditableNode } from '../helpers/find-outer-editable-node.func';

export interface IEditorTextareaProps {
  selectWord(el: HTMLElement): void;
  children: JSX.Element;
}

const SELECTION_DEBOUNCE = 150;

export default function EditorTextarea(
  props: IEditorTextareaProps
): React.ReactElement {
  function selectWord() {
    const selection = window.getSelection();

    if (!selection) {
      return;
    }

    const parent = findOuterEditableNode(
      get(selection, "anchorNode.parentNode") as HTMLElement
    );

    if (!parent) {
      return;
    }

    if (parent.classList.contains(EDITABLE_CLASS)) {
      return props.selectWord(parent);
    }

    const range = selection.getRangeAt(0);
    const container = document.createElement("span");
    container.classList.add(EDITABLE_CLASS);
    range.surroundContents(container);

    if (container.innerText) {
      return props.selectWord(container);
    }

    container.remove();
  };

  const debouncedSelectWord = debounce(selectWord, SELECTION_DEBOUNCE)

  return (
    <div
      className="EditorTextarea"
      suppressContentEditableWarning={true}
      contentEditable
      onMouseUp={debouncedSelectWord}
    >
      {props.children}
    </div>
  );
}

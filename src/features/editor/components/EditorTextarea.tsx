import * as React from "react";
import { get } from "lodash";
import { EDITABLE_CLASS } from "../constants";

export interface IEditorTextareaProps {
  editor: {
    selectWord(el: HTMLElement): void;
  };
}

export default function EditorTextarea({
  editor
}: IEditorTextareaProps): React.ReactElement {
  function selectWord() {
    const selection = window.getSelection();

    if (selection === null) {
      return;
    }

    const parent = get(selection, "anchorNode.parentElement") as HTMLElement;

    if (parent.classList.contains(EDITABLE_CLASS)) {
      editor.selectWord(parent);
    } else {
      const range = selection.getRangeAt(0);
      const container = document.createElement("span");
      container.classList.add(EDITABLE_CLASS);
      range.surroundContents(container);
      editor.selectWord(container);
    }
  }

  return (
    <div contentEditable onDoubleClick={selectWord}>
      Subjectivity is very important when considering privacy because we are
      seeing diverse levels of tolerance towards what is considered acceptable
      and what are privacy infringements. Some may claim that privacy is dead,
      or as Mark Zuckerburg said in 2010 that ‘Privacy was no longer a social
      norm.’ Although to be fair Mark Zuckerberg he did also say in a Times
      interview also in 2010 that “What people want isn’t complete privacy. It
      isn’t that they want secrecy. It’s that they want control over what they
      share and what they don’t.
    </div>
  );
}

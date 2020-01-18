import { Nillable, EditableWord, Formatting } from "../models";
import { FORMATTINGS } from "../formattings";
import { getWordValue } from "../utils";
import { set } from "lodash";
import EditorTextarea from "./EditorTextarea";
import EditorToolbar from "./EditorToolbar";

import React, { ReactElement, useState } from "react";

export interface IEditorState {
  selectedWord: Nillable<EditableWord>;
}

export default function Editor(): ReactElement {
  const [selectedWord, setSelectedWord] = useState<Nillable<EditableWord>>(
    null
  );

  function changeWordFormatting(formatting: Formatting) {
    if (!selectedWord) {
      return;
    }

    const { element, formattings } = selectedWord;
    const { property, style, value } = formatting;

    if (property) {
      element.setAttribute(property, value as string);
    }

    if (style) {
      set(element.style, style, value);
    }

    const prevFormattings = formattings.filter(
      ({ key }) => key !== formatting.key
    );

    setSelectedWord({
      formattings: [...prevFormattings, formatting],
      element
    });
  }

  function selectWord(element: HTMLElement) {
    const formattings = FORMATTINGS.map(formatting => {
      const value = getWordValue(element, formatting);
      return { ...formatting, value };
    });

    setSelectedWord({ element, formattings });
  }

  return (
    <div>
      <EditorToolbar
        changeWordFormatting={changeWordFormatting}
        selectedWord={selectedWord}
      />
      <EditorTextarea selectWord={selectWord} />
    </div>
  );
}

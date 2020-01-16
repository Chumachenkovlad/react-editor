import React, { ReactElement } from "react";
import { Formatting, EditableWord, Nillable } from "../models";
import { isNil, sortBy, get } from "lodash";

interface Props {
  editor: {
    changeFormatting(formatting: Formatting): void;
  };
  selectedWord: Nillable<EditableWord>;
}

export default function EditorToolbar({
  editor,
  selectedWord
}: Props): ReactElement {
  console.log(selectedWord);
  const { formattings } = getState(selectedWord);

  function getState(
    selectedWord: Nillable<EditableWord>
  ): { word: string; formattings: Formatting[] } {
    if (isNil(selectedWord)) {
      return { word: "", formattings: [] };
    }

    const formattings = sortBy(
      selectedWord.formattings.filter(f => f.type === "toggler"),
      "key"
    );

    const word = get(selectedWord.element, "innerText");

    return { formattings, word };
  }

  function toggleFormatting(formatting: Formatting) {
    return function() {
      editor.changeFormatting({
        ...formatting,
        value: formatting.value ? "" : formatting.appliedValue
      });
    };
  }
  return (
    <div>
      {formattings.map(formatting => {
        return (
          <button key={formatting.key} onClick={toggleFormatting(formatting)}>
            {formatting.icon}
          </button>
        );
      })}
    </div>
  );
}

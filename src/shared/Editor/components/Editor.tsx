import { Nillable, EditableWord, Formatting } from "../models";
import { get } from "lodash";
import EditorTextarea from "./EditorTextarea";
import EditorToolbar from "./EditorToolbar";

import React, { ReactElement, useState, useRef } from "react";
import { createStorage } from "../../api/storage";
import { DEFAULT_CONTENT } from "../constants/default-content";
import { FORMATTINGS } from "../constants/formattings";
import { applyFormatting } from '../helpers/apply-formatting.func';


export interface IEditorState {
  selectedWord: Nillable<EditableWord>;
}

const storage = createStorage("editor-storage", DEFAULT_CONTENT);
const initialHtml = { __html: storage.getItem() };

export default function Editor(): ReactElement {
  const textareaRef = useRef<HTMLDivElement>(null);
  const [selectedWord, setSelectedWord] = useState<Nillable<EditableWord>>(
    null
  );

  function changeWordFormatting(formatting: Formatting) {
    if (!selectedWord) {
      return;
    }

    const { element, formattings } = selectedWord;

    applyFormatting(element, formatting);

    const prevFormattings = formattings.filter(
      ({ key }) => key !== formatting.key
    );

    setSelectedWord({
      formattings: [...prevFormattings, formatting],
      element
    });

    if (textareaRef.current) {
      storage.setItem(textareaRef.current.innerHTML);
    }
  }

  function selectWord(element: HTMLElement) {
    const formattings = FORMATTINGS.map(formatting => {
      const value = get(element, formatting.prop);
      return { ...formatting, value };
    });

    setSelectedWord({ element, formattings });
  }

  return (
    <div className="Editor">
      <EditorToolbar
        changeWordFormatting={changeWordFormatting}
        selectedWord={selectedWord}
      />
      <div>
        <EditorTextarea selectWord={selectWord}>
          <div
            className="EditorTextarea-container"
            ref={textareaRef}
            dangerouslySetInnerHTML={initialHtml}
          ></div>
        </EditorTextarea>
      </div>
    </div>
  );
}

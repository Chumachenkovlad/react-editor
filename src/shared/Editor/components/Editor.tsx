import { EditableWord, Formatting } from "../models";
import EditorTextarea from "./EditorTextarea";
import EditorToolbar from "./EditorToolbar";

import React, { ReactElement, useRef } from "react";
import { createStorage } from "../../api/storage";
import { DEFAULT_CONTENT } from "../constants/default-content";


export interface IEditorState {
  selectedWord: EditableWord,
  updateFormatting: (formatting: Formatting) => void
  selectWord: (element: HTMLElement) => void
}

const storage = createStorage("editor-storage", DEFAULT_CONTENT);
const initialHtml = { __html: storage.getItem() };

export default function Editor({ selectedWord, updateFormatting, selectWord }: IEditorState): ReactElement {
  const textareaRef = useRef<HTMLDivElement>(null);

  function changeWordFormatting(formatting: Formatting) {
    if (!selectedWord) {
      return;
    }

    updateFormatting(formatting)

    if (textareaRef.current) {
      storage.setItem(textareaRef.current.innerHTML);
    }
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

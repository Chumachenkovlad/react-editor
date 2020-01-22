import { EditableWord, Formatting } from "../models";
import EditorTextarea from "./EditorTextarea";
import EditorToolbar from "./EditorToolbar";

import React, { ReactElement, useRef } from "react";

export interface IEditorState {
  htmlContent: string,
  updateContent: (html: string) => void
  selectedWord: EditableWord,
  updateFormatting: (formatting: Formatting) => void
  selectWord: (element: HTMLElement) => void
}

export default function Editor({ selectedWord, updateFormatting, selectWord, htmlContent, updateContent }: IEditorState): ReactElement {
  const textareaRef = useRef<HTMLDivElement>(null);

  function changeWordFormatting(formatting: Formatting) {
    if (!selectedWord) {
      return;
    }

    updateFormatting(formatting)

    if (textareaRef.current) {
      updateContent(textareaRef.current.innerHTML)
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
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </EditorTextarea>
      </div>
    </div>
  );
}

import * as React from "react";
import { Nillable, EditableWord, Formatting } from "../models";
import { FORMATTINGS } from "../formattings";
import { getWordValue } from "../utils";
import { set } from "lodash";
import EditorTextarea from "./EditorTextarea";
import EditorToolbar from "./EditorToolbar";

export interface IEditorProps {}

export interface IEditorState {
  selectedWord: Nillable<EditableWord>;
}

const initialState: IEditorState = { selectedWord: null };

export default class Editor extends React.Component<
  IEditorProps,
  IEditorState
> {
  constructor(props: IEditorProps) {
    super(props);

    this.state = initialState;
  }

  selectWord(element: HTMLElement) {
    const formattings = FORMATTINGS.map(formatting => {
      const value = getWordValue(element, formatting);
      return { ...formatting, value };
    });

    this.setState({
      selectedWord: { element, formattings }
    });
  }

  unselectWord() {
    this.setState(initialState);
  }

  changeFormatting(formatting: Formatting) {
    const { selectedWord } = this.state;

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

    this.setState({
      selectedWord: {
        formattings: [...prevFormattings, formatting],
        element
      }
    });
  }

  public render() {
    return (
      <div>
        <EditorToolbar editor={this} selectedWord={this.state.selectedWord} />
        <EditorTextarea editor={this} />
      </div>
    );
  }
}

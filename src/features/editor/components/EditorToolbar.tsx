import React, { ReactElement } from "react";
import { Formatting, EditableWord, Nillable } from "../models";
import { FORMATTINGS, isTogglerFormatting } from "../formattings";

interface Props {
  changeWordFormatting(formatting: Formatting): void;
  selectedWord: Nillable<EditableWord>;
}

export default function EditorToolbar({
  changeWordFormatting,
  selectedWord
}: Props): ReactElement {
  const formattings = selectedWord?.formattings || FORMATTINGS;

  const togglingFormattings = formattings.filter(isTogglerFormatting);

  const toggleFormatting = (formatting: Formatting) => () =>
    changeWordFormatting({
      ...formatting,
      value: formatting.value ? "" : formatting.appliedValue
    });

  return (
    <div>
      {togglingFormattings.map(formatting => {
        return (
          <button key={formatting.key} onClick={toggleFormatting(formatting)}>
            {formatting.icon}
          </button>
        );
      })}
    </div>
  );
}

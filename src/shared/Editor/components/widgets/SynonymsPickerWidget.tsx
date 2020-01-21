import React, { ReactElement, useState } from "react";
import { EditorWidgetProps } from "./widget.model";
import Button from "@material-ui/core/Button";
import { getSynonyms } from "../../../api/synonyms";
interface Props extends EditorWidgetProps {}

export function SynonymsPickerWidget({
  selectedValue,
  handleValueSelection
}: Props): ReactElement {
  const [words, setWords] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  /* 
    @todo check if word is capitalized
  */

  if (!initialized) {
    (async () => {
      setInitialized(true);
      setWords(await getSynonyms(selectedValue));
    })();
  }

  const selectWord = (word: string) => () => handleValueSelection(word);

  return (
    <div>
      {words.map(word => (
        <Button key={word} onClick={selectWord(word)}>
          {word}
        </Button>
      ))}
    </div>
  );
}

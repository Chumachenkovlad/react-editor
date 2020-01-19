import React, { ReactElement, useRef } from "react";
import { EditorWidgetProps } from "./widget.model";
import { isEnterKeyEvent } from "../../utils";
import TextField from "@material-ui/core/TextField";

interface Props extends EditorWidgetProps {}

export function InputWidget({
  selectedValue,
  handleValueSelection
}: Props): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  const keyPressHandler = (e: any) => {
    const input = inputRef.current;

    if (isEnterKeyEvent(e) && input) {
      handleValueSelection(input.value);
    }
  };

  return (
    <TextField
      variant="outlined"
      autoFocus
      inputRef={inputRef}
      defaultValue={selectedValue}
      onKeyPress={keyPressHandler}
    />
  );
}

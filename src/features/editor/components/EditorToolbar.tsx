import React, { ReactElement, CSSProperties } from "react";
import { Formatting, EditableWord, Nillable } from "../models";
import { FORMATTINGS, isTogglerFormatting } from "../formattings";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import { sortBy } from "lodash";

interface Props {
  changeWordFormatting(formatting: Formatting): void;
  selectedWord: Nillable<EditableWord>;
}

export default function EditorToolbar({
  changeWordFormatting,
  selectedWord
}: Props): ReactElement {
  const formattings = selectedWord?.formattings || FORMATTINGS;

  let togglingFormattings = formattings.filter(isTogglerFormatting);
  togglingFormattings = sortBy(togglingFormattings, "key");

  const toggleFormatting = (formatting: Formatting) => () =>
    changeWordFormatting({
      ...formatting,
      value: formatting.value ? "" : formatting.appliedValue
    });

  const buttonVariantByFormatting = ({ value }: Formatting) =>
    Boolean(value) ? "contained" : "outlined";

  return (
    <div className="EditorToolbar">
      <ButtonGroup variant="text" size="small">
        {togglingFormattings.map(formatting => {
          return (
            <Tooltip key={formatting.key} title={formatting.key}>
              <Button
                variant={buttonVariantByFormatting(formatting)}
                onClick={toggleFormatting(formatting)}
              >
                <Icon>{formatting.icon}</Icon>
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
    </div>
  );
}

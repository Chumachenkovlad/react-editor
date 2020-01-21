import React, { ReactElement, useState } from "react";
import { Formatting, EditableWord, Nillable } from "../models";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { sortBy } from "lodash";
import EditorToolbarDialog from "./EditorToolbarDialog";
import Tooltip from "@material-ui/core/Tooltip";
import { EditorWidget } from "./widgets/widget.model";
import { EditorWidgetFactory } from "./widgets/EditorWidgetFactory";
import { isTogglerFormatting, FORMATTINGS } from "../constants/formattings";

const oppositeValue = ({ value, appliedValue }: Formatting) =>
  value ? "" : appliedValue || "";

const getButtonVariantByFormatting = (formatting: Formatting) =>
  Boolean(formatting.value) && isTogglerFormatting(formatting)
    ? "contained"
    : "outlined";

const error = <div>No Specified Widget</div>;
interface Props {
  changeWordFormatting(formatting: Formatting): void;
  selectedWord: Nillable<EditableWord>;
}

const ToolbarButtonContent = ({ icon, label }: Partial<Formatting>): ReactElement => icon ? (
  <Icon>{icon}</Icon>
) : (
    <span>{label}</span>
  )

export default function EditorToolbar({
  changeWordFormatting,
  selectedWord
}: Props): ReactElement {
  const formattings = sortBy(selectedWord?.formattings || FORMATTINGS, "index");
  const [open, setOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<
    EditorWidget | JSX.Element
  >(error);
  const [description, setDescription] = useState<string>("");

  const updateFormatting = (value: string, formatting: Formatting) =>
    changeWordFormatting({ ...formatting, value });

  const toggleFormatting = (formatting: Formatting) => () => {
    if (!selectedWord?.element) {
      return;
    }

    isTogglerFormatting(formatting)
      ? updateFormatting(oppositeValue(formatting), formatting)
      : openDialog(formatting);
  };

  const openDialog = (formatting: Formatting) => {
    setDescription(formatting.description);
    setSelectedWidget(
      EditorWidgetFactory(formatting.widgetType, {
        selectedValue: formatting.value || "",
        handleValueSelection: value => {
          closeDialog();
          updateFormatting(value, formatting);
        }
      })
    );

    setOpen(true);
  };

  const closeDialog = () => setOpen(false);


  return (
    <div className="EditorToolbar">
      <ButtonGroup variant="text" size="small">
        {formattings.map(formatting => {
          const { key, icon, label, description } = formatting;
          return (
            <Tooltip key={key} title={description}>
              <Button
                variant={getButtonVariantByFormatting(formatting)}
                onClick={toggleFormatting(formatting)}
              >
                <ToolbarButtonContent icon={icon} label={label} />
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
      <EditorToolbarDialog
        description={description}
        handleClose={closeDialog}
        open={open}
      >
        {selectedWidget}
      </EditorToolbarDialog>
    </div>
  );
}

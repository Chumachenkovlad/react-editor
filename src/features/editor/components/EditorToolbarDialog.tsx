import React, { ReactElement } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Card, CardContent } from "@material-ui/core";

interface Props {
  description: string;
  handleClose: () => void;
  open: boolean;
  children: React.ReactNode;
}

export default function EditorToolbarDialog({
  description,
  handleClose,
  open,
  children
}: Props): ReactElement {
  return (
    <Dialog open={open} onBackdropClick={handleClose}>
      <DialogTitle>{description}</DialogTitle>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Dialog>
  );
}

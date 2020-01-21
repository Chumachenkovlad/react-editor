import { EditorWidgets } from "../components/widgets/widget.model";

export interface Formatting {
  key: string;
  prop: string;
  description: string;
  value?: string;
  appliedValue?: string;
  type: FormattingTypes;
  icon?: string;
  widgetType?: EditorWidgets;
  label?: string;
}

export enum FormattingTypes {
  Widget = "widget",
  Toggler = "toggler"
}

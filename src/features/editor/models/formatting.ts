export interface Formatting {
  key?: string;
  property?: string; // 'style.fontWeight',
  style?: string;
  value?: string;
  appliedValue?: string;
  type?: FormattingType;
  icon?: string;
}

export type FormattingType = 'toggler' | 'widget';

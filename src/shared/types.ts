export interface TextProp {
  bold?: 0 | 1;
}

export type ButtonProps = {
  bold?: boolean;
  title: string;
  titleColor?: string;
  backgroundColor?: string;
  onPress?(): void;
};

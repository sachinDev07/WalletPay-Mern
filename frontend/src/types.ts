export type LabelProps = {
  label: string;
};

export interface ValidationError {
  error: {
    message: string;
  }[];
  message: string;
  errors: Record<string, string[]>;
}
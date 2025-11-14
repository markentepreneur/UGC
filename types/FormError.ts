import { ErrorTypes } from "./ErrorTypes";

export type FormError<T extends object> = {
  [P in keyof T]?: T[P] extends object ? FormError<T[P]> : ErrorTypes | null;
};

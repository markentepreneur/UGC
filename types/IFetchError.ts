import { FormError } from "./FormError";

export interface IFetchError<T extends object> {
  message: {
    message: string;
    errors?: FormError<T>;
    status?: string;
  };
}

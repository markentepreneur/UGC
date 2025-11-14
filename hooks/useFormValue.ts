import { ErrorTypes } from "@/types/ErrorTypes";
import { ChangeEvent, useState } from "react";

export type FormDataType = { [key in string]: string | string[] | boolean };

export type IError<T extends FormDataType> = {
  [key in keyof T]?: string | null;
};

type ErrorProp<T extends FormDataType> = keyof IError<T>;

export const useFormValue = <T extends FormDataType>(initialData: T) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [error, setError] = useState<IError<T> | null>(null);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    saveError?: boolean
  ) => {
    if (!saveError) clearInputError(e.target.name);
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/[^0-9+]/g)) {
      e.target.value = e.target.value.replace(/[^0-9+]+/g, "");
    }
    onChange(e);
  };

  const onChangeSelect = <Value>(key: keyof T, value: Value) => {
    setFormData((state) => ({
      ...state,
      [key]: value,
    }));
    clearInputError(key as ErrorProp<T>);
  };

  const clearInputError = (inputName: ErrorProp<T>) => {
    if (
      setError &&
      error &&
      typeof error === "object" &&
      inputName in error &&
      error?.[inputName]
    ) {
      setError({
        ...error,
        [inputName]: null,
      });
    }
  };

  const onResetForm = () => {
    setFormData(initialData);
  };

  const getCurError = (errors: {
    [key in keyof T]?: {
      [key in ErrorTypes]?: string;
    };
  }) => {
    const curError = Object.keys(errors)
      .map((key) => [key, error?.[key as keyof typeof error]])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .find(([_, val]) => val);

    const curErrorText = error
      ? curError && curError[0] && curError[0] in errors
        ? errors[curError[0] as keyof typeof errors]?.[
            curError[1] as keyof typeof errors.email
          ]
        : null
      : null;

    return error
      ? curErrorText || "An error occurred while processing the form"
      : undefined;
  };

  return {
    formData,
    onChange,
    onNumberChange,
    onChangeSelect,
    onResetForm,
    setFormData,
    clearInputError,
    error,
    setError,
    getCurError,
  };
};

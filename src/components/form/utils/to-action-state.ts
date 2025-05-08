import { ZodError } from "zod";

export type ActionState = {
  message: string | null;
  fieldErrors?: Record<string, string[] | undefined>;
  payload?: FormData;
};

export const fromToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  if (error instanceof ZodError) {
    return {
      message: null,
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      payload: formData,
    };
  } else {
    return {
      message: "An unknown error occurred",
      payload: formData,
    };
  }
};

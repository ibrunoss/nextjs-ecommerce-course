import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export type ActionError = {
  code: string;
  path: string;
  message: string;
};

export type ActionStateError = {
  errors: ActionError[];
  message: string;
  success: false;
};

export type ActionStateSuccess = {
  message: string;
  success: true;
};

export type CathActionError =
  | ZodError
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientValidationError
  | Error;

export type ActionState = ActionStateSuccess | ActionStateError;

export type ReplaceMessageByCodeAndName = {
  name: string;
  code: string;
  message: string;
};

type GetActionErrorsParams = {
  error: CathActionError;
  path?: string;
  messageWhenErrorIsUnknown?: string;
  replacementMessageByCodeAndName?: ReplaceMessageByCodeAndName[];
};

export const initialActionStateError: ActionStateError = {
  success: false,
  message: "",
  errors: [],
};

export const initialActionStateSuccess: ActionStateSuccess = {
  success: true,
  message: "",
};

export const initialActionState: ActionState = { ...initialActionStateError };

function replaceMessageByCodeAndName({
  error,
  replacement,
}: {
  error: { name: string; code: string; message: string };
  replacement: ReplaceMessageByCodeAndName[];
}): string {
  return (
    replacement.find((e) => e.code === error.code && e.name === error.name)
      ?.message ?? error.message
  );
}

export function getActionErrors({
  error,
  path = "desconhecido",
  messageWhenErrorIsUnknown = "Erro desconhecido",
  replacementMessageByCodeAndName = [],
}: GetActionErrorsParams): ActionStateError {
  if (error instanceof ZodError) {
    const zodErrors: ActionError[] = error.errors.map((err) => ({
      code: err.code,
      message: replaceMessageByCodeAndName({
        error: { code: err.code, message: err.message, name: error.name },
        replacement: replacementMessageByCodeAndName,
      }),
      path: err.path.join("."),
    }));

    return {
      success: false,
      errors: zodErrors,
      message: zodErrors.map((err) => err.message).join(", "),
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const formattedError = {
      name: "PrismaClientKnownRequestError",
      code: error.code,
      message:
        typeof error.message === "string"
          ? error.message
          : JSON.stringify(error.message),
    };

    const replacedMessage = replaceMessageByCodeAndName({
      error: formattedError,
      replacement: replacementMessageByCodeAndName,
    });

    return {
      success: false,
      message: replacedMessage,
      errors: [
        {
          code: error.code,
          message: replacedMessage,
          path: Array.isArray(error.meta?.target)
            ? error.meta.target.join(", ")
            : "desconhecido",
        },
      ],
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message || messageWhenErrorIsUnknown,
      errors: [
        {
          code: "",
          message: error.message || messageWhenErrorIsUnknown,
          path,
        },
      ],
    };
  }

  return {
    success: false,
    message: messageWhenErrorIsUnknown,
    errors: [{ code: "", message: messageWhenErrorIsUnknown, path }],
  };
}

export function getErroByPath({
  errors,
  path,
}: {
  path: string;
  errors: ActionError[];
}): [string, boolean] {
  const errorMessage = errors
    .filter((error) => error.path === path)
    .map((e) => e.message);

  const errorLocated = errorMessage.length > 0;
  return [errorMessage.join(", ") ?? "", errorLocated];
}

export function mapErrorsToObject(
  errors: ActionError[]
): Record<string, string> {
  return errors.reduce<Record<string, string>>((acc, { message, path }) => {
    acc[path] = acc[path] ? `${acc[path]}, ${message}` : message;

    return acc;
  }, {});
}

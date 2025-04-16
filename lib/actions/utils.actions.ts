import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export type ActionStateMessage = {
  description: string;
  title?: string;
  type: "success" | "error" | "info" | "warning";
};

export type ActionError = {
  code: string;
  path: string;
  message: ActionStateMessage;
};

export type ActionStateError = {
  errors: ActionError[];
  message: ActionStateMessage;
  success: false;
};

export type ActionStateSuccess = {
  message: ActionStateMessage;
  success: true;
};

export type ActionDataStateError<D> = ActionStateError & {
  data: D;
};

export type ActionDataStateSuccess<D> = ActionStateSuccess & {
  data: D;
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

export type ActionDataState<D> =
  | ActionDataStateSuccess<D>
  | ActionDataStateError<D>;

export type ReplaceMessageByCodeAndName = {
  name: string;
  code: string;
  message: ActionStateMessage;
};

type GetActionErrorsParams = {
  error: CathActionError;
  path?: string;
  messageWhenErrorIsUnknown?: string;
  replacementMessageByCodeAndName?: ReplaceMessageByCodeAndName[];
};

export const initialActionStateError: ActionStateError = {
  success: false,
  message: { type: "error", description: "" },
  errors: [],
};

export const initialActionStateSuccess: ActionStateSuccess = {
  success: true,
  message: { type: "success", description: "" },
};

export const initialActionState: ActionState = { ...initialActionStateError };

export const initialActionDataState: <D>(data: D) => ActionDataState<D> = (
  data
) => ({ ...initialActionStateError, data });

function replaceMessageByCodeAndName({
  error,
  replacement,
}: {
  error: { name: string; code: string; message: ActionStateMessage };
  replacement: ReplaceMessageByCodeAndName[];
}): ActionStateMessage {
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
        error: {
          code: err.code,
          message: { type: "error", description: err.message },
          name: error.name,
        },
        replacement: replacementMessageByCodeAndName,
      }),
      path: err.path.join("."),
    }));

    return {
      success: false,
      errors: zodErrors,
      message: {
        type: "error",
        description: zodErrors.map((err) => err.message.description).join(", "),
      },
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const formattedError = {
      name: "PrismaClientKnownRequestError",
      code: error.code,
      message: {
        type: "error" as const,
        description:
          typeof error.message === "string"
            ? error.message
            : JSON.stringify(error.message),
      },
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

  const message = {
    type: "error" as const,
    description: error.message || messageWhenErrorIsUnknown,
  };

  if (error instanceof Error) {
    return {
      success: false,
      message,
      errors: [
        {
          code: "",
          message,
          path,
        },
      ],
    };
  }

  return {
    success: false,
    message,
    errors: [{ code: "", message, path }],
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
    .map((e) => e.message.description);

  const errorLocated = errorMessage.length > 0;
  return [errorMessage.join(", ") ?? "", errorLocated];
}

export function mapErrorsToObject(
  errors: ActionError[]
): Record<string, string> {
  return errors.reduce<Record<string, string>>((acc, { message, path }) => {
    acc[path] = acc[path]
      ? `${acc[path]}, ${message.description}`
      : message.description;

    return acc;
  }, {});
}

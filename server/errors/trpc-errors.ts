import { TRPCError } from "@trpc/server";

export const UnauthorizedError = () =>
  new TRPCError({
    code: "UNAUTHORIZED",
    message: "This route requires the caller to be authenticated.",
  });

export const NotFoundError = (resource?: string) =>
  new TRPCError({
    code: "NOT_FOUND",
    message: `The requested resource ${
      resource ? `(${resource})` : ""
    } was not found.`,
  });

export const BadRequestError = (message: string) =>
  new TRPCError({
    code: "BAD_REQUEST",
    message,
  });

export const MaintenanceModeError = () =>
  new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "The server is currently in maintenance mode.",
  });

export const InternalServerError = () =>
  new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "An internal server error occurred.",
  });

export const EnvironmentVariableMissing = (variable: string) =>
  new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `The environment variable ${variable} is missing.`,
  });

import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Handles errors in API routes, formatting them into appropriate JSON responses.
 * Provides specialized handling for Zod validation errors and generic errors, with optional logging.
 *
 * @param error - The error object to handle. Can be a `ZodError` for validation errors or any other error type.
 * @param defaultMessage - The default error message to return for non-Zod errors (status 500).
 * @param logMessage - Optional custom message to log with the error (defaults to undefined). If provided, logs to console.error with the error details.
 * @returns A `NextResponse` object with a JSON payload and appropriate HTTP status code:
 *   - 400: For `ZodError` with detailed validation errors.
 *   - 500: For all other errors with a generic message.
 * @throws No explicit throws, but may propagate errors if `z.parse()` fails internally (unlikely with proper schema usage).
 */
export default function handleError(error: any, defaultMessage: string) {
  console.error(defaultMessage, error);

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        code: "validation-failed",
        message: "Validation failed.",
        errors: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      },
      { status: 400 },
    );
  }
  if (error.code === "invalid-token") {
    return NextResponse.json(
      { code: "not-authorized", message: error.message },
      { status: 401 },
    );
  }
  if (error.code === "token-expired") {
    return NextResponse.json(
      { code: "not-authorized", message: error.message },
      { status: 401 },
    );
  }

  return NextResponse.json(
    { code: "server-error", message: defaultMessage },
    { status: 500 },
  );
}

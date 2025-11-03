import { FastifyPluginAsync, FastifyReply } from "fastify";
import fp from "fastify-plugin";

import { ErrorResponse, FailResponse, SuccessResponse } from "@server/types";

/**
 * Extends Fastify's reply interface to include standardized response helpers:
 * - `sendSuccess` for successful operations
 * - `sendFail` for client-side errors (4xx)
 * - `sendError` for server-side errors (5xx)
 */
declare module "fastify" {
  interface FastifyReply {
    /**
     * Sends a standardized 200 success response.
     *
     * @template T - The type of the data payload.
     * @param message - A short, human-readable message.
     * @param data - Optional response data of type `T`.
     * @returns The Fastify reply instance (chainable).
     *
     * @example
     * reply.sendSuccess("User created", { id: 1 });
     */
    sendSuccess: <T = any>(message: string, data?: T) => FastifyReply;
    /**
     * Sends a standardized client-side failure response (4xx range).
     *
     * @param code - HTTP status code (must be between 400–499).
     * @param message - A descriptive error message.
     * @param errors - Optional map of field-specific validation errors.
     * @returns The Fastify reply instance (chainable).
     *
     * @example
     * reply.sendFail(422, "Validation failed", { email: "Invalid email" });
     */
    sendFail: (
      code: number,
      message: string,
      errors?: Record<string, string>
    ) => FastifyReply;
    /**
     * Sends a standardized server-side error response (5xx range).
     *
     * @param message - Error message, defaults to "Internal server error".
     * @param code - HTTP status code (must be between 500–599).
     * @returns The Fastify reply instance (chainable).
     *
     * @example
     * reply.sendError("Database connection failed", 503);
     */
    sendError: (message?: string, code?: number) => FastifyReply;
  }
}

/**
 * A Fastify plugin that adds standardized response methods:
 * - `sendSuccess()` for 2xx responses
 * - `sendFail()` for 4xx responses
 * - `sendError()` for 5xx responses
 */
export const replyPlugin: FastifyPluginAsync = fp(async (server) => {
  /**
   * Validates that the provided status code matches the expected category.
   * Throws an error if the code is invalid for the response type.
   */
  const validateStatusCode = (code: number, type: "fail" | "error"): void => {
    if (type === "fail" && (code < 400 || code >= 500)) {
      throw new Error(`sendFail expects 4xx status codes, received: ${code}`);
    }
    if (type === "error" && (code < 500 || code >= 600)) {
      throw new Error(`sendError expects 5xx status codes, received: ${code}`);
    }
  };

  server.decorateReply("sendSuccess", function <
    T = any
  >(this: FastifyReply, message: string, data: T = {} as T): FastifyReply {
    const response: SuccessResponse<T> = {
      status: "success",
      message,
      data,
      timestamp: new Date().toISOString()
    };

    return this.code(200).send(response);
  });

  server.decorateReply(
    "sendFail",
    function (
      this: FastifyReply,
      code: number,
      message: string,
      errors?: Record<string, string>
    ): FastifyReply {
      try {
        validateStatusCode(code, "fail");
      } catch (error) {
        server.log.warn(error);
        code = 400;
      }

      const response: FailResponse = {
        status: "fail",
        message,
        timestamp: new Date().toISOString(),
        ...(errors && { errors })
      };

      return this.code(code).send(response);
    }
  );

  server.decorateReply(
    "sendError",
    function (
      this: FastifyReply,
      message: string = "Internal server error",
      code: number = 500
    ): FastifyReply {
      try {
        validateStatusCode(code, "error");
      } catch (error) {
        server.log.warn(error);
        code = 500;
      }

      const response: ErrorResponse = {
        status: "error",
        message,
        timestamp: new Date().toISOString()
      };

      return this.code(code).send(response);
    }
  );
});

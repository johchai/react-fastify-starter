import { FastifyPluginAsync, FastifyReply } from "fastify";
import fp from "fastify-plugin";

interface SuccessResponse<T = any> {
  status: "success";
  message: string;
  data: T;
  timestamp: string;
}

interface FailResponse {
  status: "fail";
  message: string;
  errors?: Record<string, string>;
  timestamp: string;
}

interface ErrorResponse {
  status: "error";
  message: string;
  timestamp: string;
}

declare module "fastify" {
  interface FastifyReply {
    sendSuccess: <T = any>(message: string, data?: T) => FastifyReply;
    sendFail: (
      code: number,
      message: string,
      errors?: Record<string, string>
    ) => FastifyReply;
    sendError: (message?: string, code?: number) => FastifyReply;
  }
}

export const replyPlugin: FastifyPluginAsync = fp(async (server) => {
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

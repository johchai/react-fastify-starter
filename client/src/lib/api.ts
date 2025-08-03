import { env, paths } from "@client/config";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions<TBody> {
  body?: TBody;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

interface FetchResponse<T> {
  data: T;
  status: number;
}

const request = async <TResponse, TBody = undefined>(
  method: HttpMethod,
  path: string,
  options: FetchOptions<TBody> = {}
): Promise<FetchResponse<TResponse>> => {
  const url = `${env.API_URL}${path}`;
  const { body, headers, signal } = options;

  const isJson = body !== undefined && !(body instanceof FormData);

  const res = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(isJson && { "Content-Type": "application/json" }),
      ...headers
    },
    body: isJson ? JSON.stringify(body) : (body as BodyInit),
    signal
  });

  const contentType = res.headers.get("Content-Type") || "";

  let data: unknown;
  if (contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? (data as Record<string, unknown>).message
        : res.statusText;

    if (res.status === 401) {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo =
        searchParams.get("redirectTo") || window.location.pathname;
      window.location.href = paths.auth.login.getHref(redirectTo);
    }

    throw new Error(String(message));
  }

  return { data: data as TResponse, status: res.status };
};

// Exported API methods
export const api = {
  get: <TResponse>(path: string, options?: FetchOptions<undefined>) =>
    request<TResponse>("GET", path, options),

  post: <TResponse, TBody = unknown>(
    path: string,
    options?: FetchOptions<TBody>
  ) => request<TResponse, TBody>("POST", path, options),

  put: <TResponse, TBody = unknown>(
    path: string,
    options?: FetchOptions<TBody>
  ) => request<TResponse, TBody>("PUT", path, options),

  patch: <TResponse, TBody = unknown>(
    path: string,
    options?: FetchOptions<TBody>
  ) => request<TResponse, TBody>("PATCH", path, options),

  delete: <TResponse, TBody = unknown>(
    path: string,
    options?: FetchOptions<TBody>
  ) => request<TResponse, TBody>("DELETE", path, options)
};

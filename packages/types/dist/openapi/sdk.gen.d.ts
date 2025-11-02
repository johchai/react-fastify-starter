import type { Options as ClientOptions, TDataShape, Client } from './client';
import type { GetData, GetResponses, GetApiAuthMeData, GetApiAuthMeResponses, GetApiAuthMeErrors, PostApiAuthLoginData, PostApiAuthLoginResponses, PostApiAuthLoginErrors, PostApiAuthLogoutData, PostApiAuthLogoutResponses, PostApiAuthRefreshData, PostApiAuthRefreshResponses, PostApiAuthRefreshErrors, PostApiAuthRegisterData, PostApiAuthRegisterResponses, PostApiAuthRegisterErrors, DeleteApiUsersByIdData, DeleteApiUsersByIdResponses, DeleteApiUsersByIdErrors, GetApiUsersByIdData, GetApiUsersByIdResponses, GetApiUsersByIdErrors, PatchApiUsersByIdData, PatchApiUsersByIdResponses, PatchApiUsersByIdErrors, GetApiUsersData, GetApiUsersResponses, GetApiUsersErrors, GetApiPostsData, GetApiPostsResponses, GetApiPostsErrors, PostApiPostsData, PostApiPostsResponses, PostApiPostsErrors, DeleteApiPostsByIdData, DeleteApiPostsByIdResponses, DeleteApiPostsByIdErrors, GetApiPostsByIdData, GetApiPostsByIdResponses, GetApiPostsByIdErrors, PatchApiPostsByIdData, PatchApiPostsByIdResponses, PatchApiPostsByIdErrors } from './types.gen';
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};
export declare const get: <ThrowOnError extends boolean = false>(options?: Options<GetData, ThrowOnError>) => import("./client").RequestResult<GetResponses, unknown, ThrowOnError, "fields">;
export declare const getApiAuthMe: <ThrowOnError extends boolean = false>(options?: Options<GetApiAuthMeData, ThrowOnError>) => import("./client").RequestResult<GetApiAuthMeResponses, GetApiAuthMeErrors, ThrowOnError, "fields">;
export declare const postApiAuthLogin: <ThrowOnError extends boolean = false>(options: Options<PostApiAuthLoginData, ThrowOnError>) => import("./client").RequestResult<PostApiAuthLoginResponses, PostApiAuthLoginErrors, ThrowOnError, "fields">;
export declare const postApiAuthLogout: <ThrowOnError extends boolean = false>(options?: Options<PostApiAuthLogoutData, ThrowOnError>) => import("./client").RequestResult<PostApiAuthLogoutResponses, unknown, ThrowOnError, "fields">;
export declare const postApiAuthRefresh: <ThrowOnError extends boolean = false>(options?: Options<PostApiAuthRefreshData, ThrowOnError>) => import("./client").RequestResult<PostApiAuthRefreshResponses, PostApiAuthRefreshErrors, ThrowOnError, "fields">;
export declare const postApiAuthRegister: <ThrowOnError extends boolean = false>(options: Options<PostApiAuthRegisterData, ThrowOnError>) => import("./client").RequestResult<PostApiAuthRegisterResponses, PostApiAuthRegisterErrors, ThrowOnError, "fields">;
export declare const deleteApiUsersById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiUsersByIdData, ThrowOnError>) => import("./client").RequestResult<DeleteApiUsersByIdResponses, DeleteApiUsersByIdErrors, ThrowOnError, "fields">;
export declare const getApiUsersById: <ThrowOnError extends boolean = false>(options: Options<GetApiUsersByIdData, ThrowOnError>) => import("./client").RequestResult<GetApiUsersByIdResponses, GetApiUsersByIdErrors, ThrowOnError, "fields">;
export declare const patchApiUsersById: <ThrowOnError extends boolean = false>(options: Options<PatchApiUsersByIdData, ThrowOnError>) => import("./client").RequestResult<PatchApiUsersByIdResponses, PatchApiUsersByIdErrors, ThrowOnError, "fields">;
export declare const getApiUsers: <ThrowOnError extends boolean = false>(options?: Options<GetApiUsersData, ThrowOnError>) => import("./client").RequestResult<GetApiUsersResponses, GetApiUsersErrors, ThrowOnError, "fields">;
export declare const getApiPosts: <ThrowOnError extends boolean = false>(options?: Options<GetApiPostsData, ThrowOnError>) => import("./client").RequestResult<GetApiPostsResponses, GetApiPostsErrors, ThrowOnError, "fields">;
export declare const postApiPosts: <ThrowOnError extends boolean = false>(options: Options<PostApiPostsData, ThrowOnError>) => import("./client").RequestResult<PostApiPostsResponses, PostApiPostsErrors, ThrowOnError, "fields">;
export declare const deleteApiPostsById: <ThrowOnError extends boolean = false>(options: Options<DeleteApiPostsByIdData, ThrowOnError>) => import("./client").RequestResult<DeleteApiPostsByIdResponses, DeleteApiPostsByIdErrors, ThrowOnError, "fields">;
export declare const getApiPostsById: <ThrowOnError extends boolean = false>(options: Options<GetApiPostsByIdData, ThrowOnError>) => import("./client").RequestResult<GetApiPostsByIdResponses, GetApiPostsByIdErrors, ThrowOnError, "fields">;
export declare const patchApiPostsById: <ThrowOnError extends boolean = false>(options: Options<PatchApiPostsByIdData, ThrowOnError>) => import("./client").RequestResult<PatchApiPostsByIdResponses, PatchApiPostsByIdErrors, ThrowOnError, "fields">;

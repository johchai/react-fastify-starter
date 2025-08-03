/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostsService {
    /**
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static postApiPosts(
        requestBody: {
            title: string;
            content: string;
        },
    ): CancelablePromise<{
        status: 'success';
        message: string;
        data: {
            post: {
                id: number;
                title: string;
                content: string;
                user_id: number;
                created_at?: string;
            };
        };
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Default Response`,
                500: `Default Response`,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getApiPosts(): CancelablePromise<{
        status: 'success';
        message: string;
        data: {
            posts: Array<{
                id: number;
                title: string;
                content: string;
                user_id: number;
                created_at?: string;
            }>;
        };
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/',
            errors: {
                400: `Default Response`,
                404: `Default Response`,
            },
        });
    }
    /**
     * @param id
     * @returns any Default Response
     * @throws ApiError
     */
    public static getApiPosts1(
        id: number,
    ): CancelablePromise<{
        status: 'success';
        message: string;
        data: {
            post: {
                id: number;
                title: string;
                content: string;
                user_id: number;
                created_at?: string;
            };
        };
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Default Response`,
                404: `Default Response`,
                500: `Default Response`,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static patchApiPosts(
        id: number,
        requestBody?: {
            title?: string;
            content?: string;
        },
    ): CancelablePromise<{
        status: 'success';
        message: string;
        data: {
            post: {
                id: number;
                title: string;
                content: string;
                user_id: number;
                created_at?: string;
            };
        };
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/posts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Default Response`,
                500: `Default Response`,
            },
        });
    }
    /**
     * @param id
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteApiPosts(
        id: number,
    ): CancelablePromise<{
        status: 'success';
        message: string;
        data: {
            post: {
                id: number;
                title: string;
                content: string;
                user_id: number;
                created_at?: string;
            };
        };
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/posts/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Default Response`,
                500: `Default Response`,
            },
        });
    }
}

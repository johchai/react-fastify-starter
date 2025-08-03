/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @param id
     * @returns any Default Response
     * @throws ApiError
     */
    public static getApiUsers(
        id: number,
    ): CancelablePromise<{
        status: 'success';
        message: string;
        data: {
            user: {
                id: number;
                name: string;
                email: string;
                role: ('admin' | 'editor' | 'viewer');
            };
        };
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{id}',
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
     * @returns any Default Response
     * @throws ApiError
     */
    public static deleteApiUsers(
        id: number,
    ): CancelablePromise<{
        status: 'success';
        message: string;
        data: {
            user: {
                id: number;
                name: string;
                email: string;
                role: ('admin' | 'editor' | 'viewer');
            };
        };
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
            errors: {
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
    public static patchApiUsers(
        id: number,
        requestBody?: ({
            name: string;
            email: string;
        } & {
            password: string;
        }),
    ): CancelablePromise<{
        status: 'success';
        message: string;
        data: {
            user: {
                id: number;
                name: string;
                email: string;
                role: ('admin' | 'editor' | 'viewer');
            };
        };
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/{id}',
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
     * @returns any Default Response
     * @throws ApiError
     */
    public static getApiUsers1(): CancelablePromise<{
        status: 'success';
        message: string;
        data: {
            users: Array<{
                id: number;
                name: string;
                email: string;
                role: ('admin' | 'editor' | 'viewer');
            }>;
        };
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/',
            errors: {
                400: `Default Response`,
                404: `Default Response`,
            },
        });
    }
}

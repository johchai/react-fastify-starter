/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static getApiAuthMe(): CancelablePromise<{
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
            url: '/api/auth/me',
            errors: {
                401: `Unauthorized: Invalid or expired token`,
                500: `Error: Internal Server Error`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static postApiAuthLogin(
        requestBody: {
            email: string;
            password: string;
        },
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
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Default Response`,
                500: `Default Response`,
            },
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static postApiAuthLogout(): CancelablePromise<{
        status: 'success';
        message: string;
        data: any;
        timestamp: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
        });
    }
    /**
     * @returns any Default Response
     * @throws ApiError
     */
    public static postApiAuthRefresh(): CancelablePromise<{
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
            method: 'POST',
            url: '/api/auth/refresh',
            errors: {
                401: `Unauthorized: Invalid or expired token`,
                500: `Error: Internal Server Error`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any Default Response
     * @throws ApiError
     */
    public static postApiAuthRegister(
        requestBody: {
            name: string;
            email: string;
            password: string;
            role: ('admin' | 'editor' | 'viewer');
        },
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
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Default Response`,
                500: `Default Response`,
            },
        });
    }
}

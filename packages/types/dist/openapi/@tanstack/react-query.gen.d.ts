import { type Options } from '../sdk.gen';
import { type UseMutationOptions, type DefaultError, type InfiniteData } from '@tanstack/react-query';
import type { GetData, GetApiAuthMeData, PostApiAuthLoginData, PostApiAuthLoginError, PostApiAuthLoginResponse, PostApiAuthLogoutData, PostApiAuthLogoutResponse, PostApiAuthRefreshData, PostApiAuthRefreshError, PostApiAuthRefreshResponse, PostApiAuthRegisterData, PostApiAuthRegisterError, PostApiAuthRegisterResponse, DeleteApiUsersByIdData, DeleteApiUsersByIdError, DeleteApiUsersByIdResponse, GetApiUsersByIdData, PatchApiUsersByIdData, PatchApiUsersByIdError, PatchApiUsersByIdResponse, GetApiUsersData, GetApiUsersError, GetApiPostsData, GetApiPostsError, PostApiPostsData, PostApiPostsError, PostApiPostsResponse, DeleteApiPostsByIdData, DeleteApiPostsByIdError, DeleteApiPostsByIdResponse, GetApiPostsByIdData, PatchApiPostsByIdData, PatchApiPostsByIdError, PatchApiPostsByIdResponse } from '../types.gen';
export type QueryKey<TOptions extends Options> = [
    Pick<TOptions, 'baseUrl' | 'body' | 'headers' | 'path' | 'query'> & {
        _id: string;
        _infinite?: boolean;
    }
];
export declare const getQueryKey: (options?: Options<GetData>) => [Pick<Options<GetData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const getOptions: (options?: Options<GetData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    message?: string;
}, Error, {
    message?: string;
}, [Pick<Options<GetData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        message?: string;
    }, [Pick<Options<GetData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<GetData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            message?: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const getApiAuthMeQueryKey: (options?: Options<GetApiAuthMeData>) => [Pick<Options<GetApiAuthMeData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const getApiAuthMeOptions: (options?: Options<GetApiAuthMeData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    status: "success";
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    timestamp: string;
}, Error, {
    status: "success";
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    timestamp: string;
}, [Pick<Options<GetApiAuthMeData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        status: "success";
        message: string;
        data: {
            user: {
                id: string;
                name: string;
                email: string;
                role: "admin" | "editor" | "viewer";
                created_at: string;
                deleted_at: string | null;
            };
        };
        timestamp: string;
    }, [Pick<Options<GetApiAuthMeData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<GetApiAuthMeData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            status: "success";
            message: string;
            data: {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    role: "admin" | "editor" | "viewer";
                    created_at: string;
                    deleted_at: string | null;
                };
            };
            timestamp: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const postApiAuthLoginQueryKey: (options: Options<PostApiAuthLoginData>) => [Pick<Options<PostApiAuthLoginData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const postApiAuthLoginOptions: (options: Options<PostApiAuthLoginData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    status: "success";
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    timestamp: string;
}, Error, {
    status: "success";
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    timestamp: string;
}, [Pick<Options<PostApiAuthLoginData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        status: "success";
        message: string;
        data: {
            user: {
                id: string;
                name: string;
                email: string;
                role: "admin" | "editor" | "viewer";
                created_at: string;
                deleted_at: string | null;
            };
        };
        timestamp: string;
    }, [Pick<Options<PostApiAuthLoginData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<PostApiAuthLoginData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            status: "success";
            message: string;
            data: {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    role: "admin" | "editor" | "viewer";
                    created_at: string;
                    deleted_at: string | null;
                };
            };
            timestamp: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const postApiAuthLoginMutation: (options?: Partial<Options<PostApiAuthLoginData>>) => UseMutationOptions<PostApiAuthLoginResponse, PostApiAuthLoginError, Options<PostApiAuthLoginData>>;
export declare const postApiAuthLogoutQueryKey: (options?: Options<PostApiAuthLogoutData>) => [Pick<Options<PostApiAuthLogoutData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const postApiAuthLogoutOptions: (options?: Options<PostApiAuthLogoutData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    status: "success";
    message: string;
    data: {
        [key: string]: unknown;
    };
    timestamp: string;
}, Error, {
    status: "success";
    message: string;
    data: {
        [key: string]: unknown;
    };
    timestamp: string;
}, [Pick<Options<PostApiAuthLogoutData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        status: "success";
        message: string;
        data: {
            [key: string]: unknown;
        };
        timestamp: string;
    }, [Pick<Options<PostApiAuthLogoutData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<PostApiAuthLogoutData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            status: "success";
            message: string;
            data: {
                [key: string]: unknown;
            };
            timestamp: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const postApiAuthLogoutMutation: (options?: Partial<Options<PostApiAuthLogoutData>>) => UseMutationOptions<PostApiAuthLogoutResponse, DefaultError, Options<PostApiAuthLogoutData>>;
export declare const postApiAuthRefreshQueryKey: (options?: Options<PostApiAuthRefreshData>) => [Pick<Options<PostApiAuthRefreshData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const postApiAuthRefreshOptions: (options?: Options<PostApiAuthRefreshData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    status: "success";
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    timestamp: string;
}, Error, {
    status: "success";
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    timestamp: string;
}, [Pick<Options<PostApiAuthRefreshData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        status: "success";
        message: string;
        data: {
            user: {
                id: string;
                name: string;
                email: string;
                role: "admin" | "editor" | "viewer";
                created_at: string;
                deleted_at: string | null;
            };
        };
        timestamp: string;
    }, [Pick<Options<PostApiAuthRefreshData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<PostApiAuthRefreshData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            status: "success";
            message: string;
            data: {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    role: "admin" | "editor" | "viewer";
                    created_at: string;
                    deleted_at: string | null;
                };
            };
            timestamp: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const postApiAuthRefreshMutation: (options?: Partial<Options<PostApiAuthRefreshData>>) => UseMutationOptions<PostApiAuthRefreshResponse, PostApiAuthRefreshError, Options<PostApiAuthRefreshData>>;
export declare const postApiAuthRegisterQueryKey: (options: Options<PostApiAuthRegisterData>) => [Pick<Options<PostApiAuthRegisterData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const postApiAuthRegisterOptions: (options: Options<PostApiAuthRegisterData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    status: "success";
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    timestamp: string;
}, Error, {
    status: "success";
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    timestamp: string;
}, [Pick<Options<PostApiAuthRegisterData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        status: "success";
        message: string;
        data: {
            user: {
                id: string;
                name: string;
                email: string;
                role: "admin" | "editor" | "viewer";
                created_at: string;
                deleted_at: string | null;
            };
        };
        timestamp: string;
    }, [Pick<Options<PostApiAuthRegisterData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<PostApiAuthRegisterData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            status: "success";
            message: string;
            data: {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    role: "admin" | "editor" | "viewer";
                    created_at: string;
                    deleted_at: string | null;
                };
            };
            timestamp: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const postApiAuthRegisterMutation: (options?: Partial<Options<PostApiAuthRegisterData>>) => UseMutationOptions<PostApiAuthRegisterResponse, PostApiAuthRegisterError, Options<PostApiAuthRegisterData>>;
export declare const deleteApiUsersByIdMutation: (options?: Partial<Options<DeleteApiUsersByIdData>>) => UseMutationOptions<DeleteApiUsersByIdResponse, DeleteApiUsersByIdError, Options<DeleteApiUsersByIdData>>;
export declare const getApiUsersByIdQueryKey: (options: Options<GetApiUsersByIdData>) => [Pick<Options<GetApiUsersByIdData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const getApiUsersByIdOptions: (options: Options<GetApiUsersByIdData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    status: "success";
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    timestamp: string;
}, Error, {
    status: "success";
    message: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    timestamp: string;
}, [Pick<Options<GetApiUsersByIdData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        status: "success";
        message: string;
        data: {
            user: {
                id: string;
                name: string;
                email: string;
                role: "admin" | "editor" | "viewer";
                created_at: string;
                deleted_at: string | null;
            };
        };
        timestamp: string;
    }, [Pick<Options<GetApiUsersByIdData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<GetApiUsersByIdData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            status: "success";
            message: string;
            data: {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    role: "admin" | "editor" | "viewer";
                    created_at: string;
                    deleted_at: string | null;
                };
            };
            timestamp: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const patchApiUsersByIdMutation: (options?: Partial<Options<PatchApiUsersByIdData>>) => UseMutationOptions<PatchApiUsersByIdResponse, PatchApiUsersByIdError, Options<PatchApiUsersByIdData>>;
export declare const getApiUsersQueryKey: (options?: Options<GetApiUsersData>) => [Pick<Options<GetApiUsersData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const getApiUsersOptions: (options?: Options<GetApiUsersData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    status: "success";
    message: string;
    data: {
        users: Array<{
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
    timestamp: string;
}, Error, {
    status: "success";
    message: string;
    data: {
        users: Array<{
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
    timestamp: string;
}, [Pick<Options<GetApiUsersData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        status: "success";
        message: string;
        data: {
            users: Array<{
                id: string;
                name: string;
                email: string;
                role: "admin" | "editor" | "viewer";
                created_at: string;
                deleted_at: string | null;
            }>;
            meta: {
                page: number;
                pageSize: number;
                totalItems: number;
                totalPages: number;
            };
        };
        timestamp: string;
    }, [Pick<Options<GetApiUsersData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<GetApiUsersData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            status: "success";
            message: string;
            data: {
                users: Array<{
                    id: string;
                    name: string;
                    email: string;
                    role: "admin" | "editor" | "viewer";
                    created_at: string;
                    deleted_at: string | null;
                }>;
                meta: {
                    page: number;
                    pageSize: number;
                    totalItems: number;
                    totalPages: number;
                };
            };
            timestamp: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const getApiUsersInfiniteQueryKey: (options?: Options<GetApiUsersData>) => QueryKey<Options<GetApiUsersData>>;
export declare const getApiUsersInfiniteOptions: (options?: Options<GetApiUsersData>) => import("@tanstack/react-query").UseInfiniteQueryOptions<{
    status: "success";
    message: string;
    data: {
        users: Array<{
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
    timestamp: string;
}, GetApiUsersError, InfiniteData<{
    status: "success";
    message: string;
    data: {
        users: Array<{
            id: string;
            name: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
    timestamp: string;
}, unknown>, QueryKey<Options<GetApiUsersData>>, number | Pick<Pick<Options<GetApiUsersData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}, "query" | "body" | "headers" | "path">> & {
    initialData: InfiniteData<{
        status: "success";
        message: string;
        data: {
            users: Array<{
                id: string;
                name: string;
                email: string;
                role: "admin" | "editor" | "viewer";
                created_at: string;
                deleted_at: string | null;
            }>;
            meta: {
                page: number;
                pageSize: number;
                totalItems: number;
                totalPages: number;
            };
        };
        timestamp: string;
    }, number | Pick<Pick<Options<GetApiUsersData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }, "query" | "body" | "headers" | "path">> | (() => InfiniteData<{
        status: "success";
        message: string;
        data: {
            users: Array<{
                id: string;
                name: string;
                email: string;
                role: "admin" | "editor" | "viewer";
                created_at: string;
                deleted_at: string | null;
            }>;
            meta: {
                page: number;
                pageSize: number;
                totalItems: number;
                totalPages: number;
            };
        };
        timestamp: string;
    }, number | Pick<Pick<Options<GetApiUsersData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }, "query" | "body" | "headers" | "path">>) | undefined;
} & {
    queryKey: QueryKey<Options<GetApiUsersData>> & {
        [dataTagSymbol]: InfiniteData<{
            status: "success";
            message: string;
            data: {
                users: Array<{
                    id: string;
                    name: string;
                    email: string;
                    role: "admin" | "editor" | "viewer";
                    created_at: string;
                    deleted_at: string | null;
                }>;
                meta: {
                    page: number;
                    pageSize: number;
                    totalItems: number;
                    totalPages: number;
                };
            };
            timestamp: string;
        }, unknown>;
        [dataTagErrorSymbol]: GetApiUsersError;
    };
};
export declare const getApiPostsQueryKey: (options?: Options<GetApiPostsData>) => [Pick<Options<GetApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const getApiPostsOptions: (options?: Options<GetApiPostsData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    status: "success";
    message: string;
    data: {
        posts: Array<{
            id: string;
            title: string;
            content: string;
            created_at: string;
            deleted_at: string | null;
            user: {
                id: string;
                name: string;
            };
        }>;
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
    timestamp: string;
}, Error, {
    status: "success";
    message: string;
    data: {
        posts: Array<{
            id: string;
            title: string;
            content: string;
            created_at: string;
            deleted_at: string | null;
            user: {
                id: string;
                name: string;
            };
        }>;
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
    timestamp: string;
}, [Pick<Options<GetApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        status: "success";
        message: string;
        data: {
            posts: Array<{
                id: string;
                title: string;
                content: string;
                created_at: string;
                deleted_at: string | null;
                user: {
                    id: string;
                    name: string;
                };
            }>;
            meta: {
                page: number;
                pageSize: number;
                totalItems: number;
                totalPages: number;
            };
        };
        timestamp: string;
    }, [Pick<Options<GetApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<GetApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            status: "success";
            message: string;
            data: {
                posts: Array<{
                    id: string;
                    title: string;
                    content: string;
                    created_at: string;
                    deleted_at: string | null;
                    user: {
                        id: string;
                        name: string;
                    };
                }>;
                meta: {
                    page: number;
                    pageSize: number;
                    totalItems: number;
                    totalPages: number;
                };
            };
            timestamp: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const getApiPostsInfiniteQueryKey: (options?: Options<GetApiPostsData>) => QueryKey<Options<GetApiPostsData>>;
export declare const getApiPostsInfiniteOptions: (options?: Options<GetApiPostsData>) => import("@tanstack/react-query").UseInfiniteQueryOptions<{
    status: "success";
    message: string;
    data: {
        posts: Array<{
            id: string;
            title: string;
            content: string;
            created_at: string;
            deleted_at: string | null;
            user: {
                id: string;
                name: string;
            };
        }>;
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
    timestamp: string;
}, GetApiPostsError, InfiniteData<{
    status: "success";
    message: string;
    data: {
        posts: Array<{
            id: string;
            title: string;
            content: string;
            created_at: string;
            deleted_at: string | null;
            user: {
                id: string;
                name: string;
            };
        }>;
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
    timestamp: string;
}, unknown>, QueryKey<Options<GetApiPostsData>>, number | Pick<Pick<Options<GetApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}, "query" | "body" | "headers" | "path">> & {
    initialData: InfiniteData<{
        status: "success";
        message: string;
        data: {
            posts: Array<{
                id: string;
                title: string;
                content: string;
                created_at: string;
                deleted_at: string | null;
                user: {
                    id: string;
                    name: string;
                };
            }>;
            meta: {
                page: number;
                pageSize: number;
                totalItems: number;
                totalPages: number;
            };
        };
        timestamp: string;
    }, number | Pick<Pick<Options<GetApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }, "query" | "body" | "headers" | "path">> | (() => InfiniteData<{
        status: "success";
        message: string;
        data: {
            posts: Array<{
                id: string;
                title: string;
                content: string;
                created_at: string;
                deleted_at: string | null;
                user: {
                    id: string;
                    name: string;
                };
            }>;
            meta: {
                page: number;
                pageSize: number;
                totalItems: number;
                totalPages: number;
            };
        };
        timestamp: string;
    }, number | Pick<Pick<Options<GetApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }, "query" | "body" | "headers" | "path">>) | undefined;
} & {
    queryKey: QueryKey<Options<GetApiPostsData>> & {
        [dataTagSymbol]: InfiniteData<{
            status: "success";
            message: string;
            data: {
                posts: Array<{
                    id: string;
                    title: string;
                    content: string;
                    created_at: string;
                    deleted_at: string | null;
                    user: {
                        id: string;
                        name: string;
                    };
                }>;
                meta: {
                    page: number;
                    pageSize: number;
                    totalItems: number;
                    totalPages: number;
                };
            };
            timestamp: string;
        }, unknown>;
        [dataTagErrorSymbol]: GetApiPostsError;
    };
};
export declare const postApiPostsQueryKey: (options: Options<PostApiPostsData>) => [Pick<Options<PostApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const postApiPostsOptions: (options: Options<PostApiPostsData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    status: "success";
    message: string;
    data: {
        post: {
            id: string;
            title: string;
            content: string;
            created_at: string;
            deleted_at: string | null;
            user: {
                id: string;
                name: string;
            };
        };
    };
    timestamp: string;
}, Error, {
    status: "success";
    message: string;
    data: {
        post: {
            id: string;
            title: string;
            content: string;
            created_at: string;
            deleted_at: string | null;
            user: {
                id: string;
                name: string;
            };
        };
    };
    timestamp: string;
}, [Pick<Options<PostApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        status: "success";
        message: string;
        data: {
            post: {
                id: string;
                title: string;
                content: string;
                created_at: string;
                deleted_at: string | null;
                user: {
                    id: string;
                    name: string;
                };
            };
        };
        timestamp: string;
    }, [Pick<Options<PostApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<PostApiPostsData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            status: "success";
            message: string;
            data: {
                post: {
                    id: string;
                    title: string;
                    content: string;
                    created_at: string;
                    deleted_at: string | null;
                    user: {
                        id: string;
                        name: string;
                    };
                };
            };
            timestamp: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const postApiPostsMutation: (options?: Partial<Options<PostApiPostsData>>) => UseMutationOptions<PostApiPostsResponse, PostApiPostsError, Options<PostApiPostsData>>;
export declare const deleteApiPostsByIdMutation: (options?: Partial<Options<DeleteApiPostsByIdData>>) => UseMutationOptions<DeleteApiPostsByIdResponse, DeleteApiPostsByIdError, Options<DeleteApiPostsByIdData>>;
export declare const getApiPostsByIdQueryKey: (options: Options<GetApiPostsByIdData>) => [Pick<Options<GetApiPostsByIdData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}];
export declare const getApiPostsByIdOptions: (options: Options<GetApiPostsByIdData>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<{
    status: "success";
    message: string;
    data: {
        post: {
            id: string;
            title: string;
            content: string;
            created_at: string;
            deleted_at: string | null;
            user: {
                id: string;
                name: string;
            };
        };
    };
    timestamp: string;
}, Error, {
    status: "success";
    message: string;
    data: {
        post: {
            id: string;
            title: string;
            content: string;
            created_at: string;
            deleted_at: string | null;
            user: {
                id: string;
                name: string;
            };
        };
    };
    timestamp: string;
}, [Pick<Options<GetApiPostsByIdData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
    _id: string;
    _infinite?: boolean;
}]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<{
        status: "success";
        message: string;
        data: {
            post: {
                id: string;
                title: string;
                content: string;
                created_at: string;
                deleted_at: string | null;
                user: {
                    id: string;
                    name: string;
                };
            };
        };
        timestamp: string;
    }, [Pick<Options<GetApiPostsByIdData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }], never> | undefined;
} & {
    queryKey: [Pick<Options<GetApiPostsByIdData>, "query" | "body" | "headers" | "path" | "baseUrl"> & {
        _id: string;
        _infinite?: boolean;
    }] & {
        [dataTagSymbol]: {
            status: "success";
            message: string;
            data: {
                post: {
                    id: string;
                    title: string;
                    content: string;
                    created_at: string;
                    deleted_at: string | null;
                    user: {
                        id: string;
                        name: string;
                    };
                };
            };
            timestamp: string;
        };
        [dataTagErrorSymbol]: Error;
    };
};
export declare const patchApiPostsByIdMutation: (options?: Partial<Options<PatchApiPostsByIdData>>) => UseMutationOptions<PatchApiPostsByIdResponse, PatchApiPostsByIdError, Options<PatchApiPostsByIdData>>;

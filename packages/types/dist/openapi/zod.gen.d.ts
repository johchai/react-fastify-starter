import { z } from 'zod/v3';
export declare const zGetData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}>;
/**
 * Server is running
 */
export declare const zGetResponse: z.ZodObject<{
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message?: string | undefined;
}, {
    message?: string | undefined;
}>;
export declare const zGetApiAuthMeData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}>;
/**
 * Default Response
 */
export declare const zGetApiAuthMeResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodUnion<[z.ZodEnum<["admin"]>, z.ZodEnum<["editor"]>, z.ZodEnum<["viewer"]>]>;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zPostApiAuthLoginData: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        password: string;
    };
    query?: undefined;
    path?: undefined;
}, {
    body: {
        email: string;
        password: string;
    };
    query?: undefined;
    path?: undefined;
}>;
/**
 * Default Response
 */
export declare const zPostApiAuthLoginResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodUnion<[z.ZodEnum<["admin"]>, z.ZodEnum<["editor"]>, z.ZodEnum<["viewer"]>]>;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zPostApiAuthLogoutData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}>;
/**
 * Default Response
 */
export declare const zPostApiAuthLogoutResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {};
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {};
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zPostApiAuthRefreshData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}, {
    query?: undefined;
    body?: undefined;
    path?: undefined;
}>;
/**
 * Default Response
 */
export declare const zPostApiAuthRefreshResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodUnion<[z.ZodEnum<["admin"]>, z.ZodEnum<["editor"]>, z.ZodEnum<["viewer"]>]>;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zPostApiAuthRegisterData: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        password: string;
    }, {
        name: string;
        email: string;
        password: string;
    }>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        email: string;
        password: string;
    };
    query?: undefined;
    path?: undefined;
}, {
    body: {
        name: string;
        email: string;
        password: string;
    };
    query?: undefined;
    path?: undefined;
}>;
/**
 * Default Response
 */
export declare const zPostApiAuthRegisterResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodUnion<[z.ZodEnum<["admin"]>, z.ZodEnum<["editor"]>, z.ZodEnum<["viewer"]>]>;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zDeleteApiUsersByIdData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    path: {
        id: string;
    };
    query?: undefined;
    body?: undefined;
}, {
    path: {
        id: string;
    };
    query?: undefined;
    body?: undefined;
}>;
/**
 * Default Response
 */
export declare const zDeleteApiUsersByIdResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodUnion<[z.ZodEnum<["admin"]>, z.ZodEnum<["editor"]>, z.ZodEnum<["viewer"]>]>;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zGetApiUsersByIdData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    path: {
        id: string;
    };
    query?: undefined;
    body?: undefined;
}, {
    path: {
        id: string;
    };
    query?: undefined;
    body?: undefined;
}>;
/**
 * Default Response
 */
export declare const zGetApiUsersByIdResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodUnion<[z.ZodEnum<["admin"]>, z.ZodEnum<["editor"]>, z.ZodEnum<["viewer"]>]>;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zPatchApiUsersByIdData: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        role: z.ZodUnion<[z.ZodEnum<["admin"]>, z.ZodEnum<["editor"]>, z.ZodEnum<["viewer"]>]>;
        deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        role: "admin" | "editor" | "viewer";
        deleted_at: string | null;
    }, {
        name: string;
        email: string;
        role: "admin" | "editor" | "viewer";
        deleted_at: string | null;
    }>;
    path: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        email: string;
        role: "admin" | "editor" | "viewer";
        deleted_at: string | null;
    };
    path: {
        id: string;
    };
    query?: undefined;
}, {
    body: {
        name: string;
        email: string;
        role: "admin" | "editor" | "viewer";
        deleted_at: string | null;
    };
    path: {
        id: string;
    };
    query?: undefined;
}>;
/**
 * Default Response
 */
export declare const zPatchApiUsersByIdResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodUnion<[z.ZodEnum<["admin"]>, z.ZodEnum<["editor"]>, z.ZodEnum<["viewer"]>]>;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }, {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        user: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zGetApiUsersData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodObject<{
        page: z.ZodOptional<z.ZodNumber>;
        pageSize: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        page?: number | undefined;
        pageSize?: number | undefined;
    }, {
        page?: number | undefined;
        pageSize?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    query?: {
        page?: number | undefined;
        pageSize?: number | undefined;
    } | undefined;
    body?: undefined;
    path?: undefined;
}, {
    query?: {
        page?: number | undefined;
        pageSize?: number | undefined;
    } | undefined;
    body?: undefined;
    path?: undefined;
}>;
/**
 * Default Response
 */
export declare const zGetApiUsersResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        users: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            role: z.ZodUnion<[z.ZodEnum<["admin"]>, z.ZodEnum<["editor"]>, z.ZodEnum<["viewer"]>]>;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }, {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }>, "many">;
        meta: z.ZodObject<{
            page: z.ZodNumber;
            pageSize: z.ZodNumber;
            totalItems: z.ZodNumber;
            totalPages: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        }, {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        users: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }[];
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    }, {
        users: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }[];
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        users: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }[];
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        users: {
            name: string;
            id: string;
            email: string;
            role: "admin" | "editor" | "viewer";
            created_at: string;
            deleted_at: string | null;
        }[];
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zGetApiPostsData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodObject<{
        page: z.ZodOptional<z.ZodNumber>;
        pageSize: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        page?: number | undefined;
        pageSize?: number | undefined;
    }, {
        page?: number | undefined;
        pageSize?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    query?: {
        page?: number | undefined;
        pageSize?: number | undefined;
    } | undefined;
    body?: undefined;
    path?: undefined;
}, {
    query?: {
        page?: number | undefined;
        pageSize?: number | undefined;
    } | undefined;
    body?: undefined;
    path?: undefined;
}>;
/**
 * Default Response
 */
export declare const zGetApiPostsResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        posts: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            content: z.ZodString;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
            user: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: string;
            }, {
                name: string;
                id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }, {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }>, "many">;
        meta: z.ZodObject<{
            page: z.ZodNumber;
            pageSize: z.ZodNumber;
            totalItems: z.ZodNumber;
            totalPages: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        }, {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
        posts: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }[];
    }, {
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
        posts: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }[];
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
        posts: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }[];
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        meta: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
        posts: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }[];
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zPostApiPostsData: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        content: string;
    }, {
        title: string;
        content: string;
    }>;
    path: z.ZodOptional<z.ZodNever>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    body: {
        title: string;
        content: string;
    };
    query?: undefined;
    path?: undefined;
}, {
    body: {
        title: string;
        content: string;
    };
    query?: undefined;
    path?: undefined;
}>;
/**
 * Default Response
 */
export declare const zPostApiPostsResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        post: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            content: z.ZodString;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
            user: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: string;
            }, {
                name: string;
                id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }, {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    }, {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zDeleteApiPostsByIdData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    path: {
        id: string;
    };
    query?: undefined;
    body?: undefined;
}, {
    path: {
        id: string;
    };
    query?: undefined;
    body?: undefined;
}>;
/**
 * Default Response
 */
export declare const zDeleteApiPostsByIdResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        post: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            content: z.ZodString;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
            user: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: string;
            }, {
                name: string;
                id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }, {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    }, {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zGetApiPostsByIdData: z.ZodObject<{
    body: z.ZodOptional<z.ZodNever>;
    path: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    path: {
        id: string;
    };
    query?: undefined;
    body?: undefined;
}, {
    path: {
        id: string;
    };
    query?: undefined;
    body?: undefined;
}>;
/**
 * Default Response
 */
export declare const zGetApiPostsByIdResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        post: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            content: z.ZodString;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
            user: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: string;
            }, {
                name: string;
                id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }, {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    }, {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;
export declare const zPatchApiPostsByIdData: z.ZodObject<{
    body: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
        content?: string | undefined;
    }, {
        title?: string | undefined;
        content?: string | undefined;
    }>>;
    path: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    query: z.ZodOptional<z.ZodNever>;
}, "strip", z.ZodTypeAny, {
    path: {
        id: string;
    };
    query?: undefined;
    body?: {
        title?: string | undefined;
        content?: string | undefined;
    } | undefined;
}, {
    path: {
        id: string;
    };
    query?: undefined;
    body?: {
        title?: string | undefined;
        content?: string | undefined;
    } | undefined;
}>;
/**
 * Default Response
 */
export declare const zPatchApiPostsByIdResponse: z.ZodObject<{
    status: z.ZodEnum<["success"]>;
    message: z.ZodString;
    data: z.ZodObject<{
        post: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            content: z.ZodString;
            created_at: z.ZodString;
            deleted_at: z.ZodUnion<[z.ZodString, z.ZodNull]>;
            user: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: string;
            }, {
                name: string;
                id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }, {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    }, {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    }>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    data: {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}, {
    data: {
        post: {
            user: {
                name: string;
                id: string;
            };
            id: string;
            created_at: string;
            deleted_at: string | null;
            title: string;
            content: string;
        };
    };
    message: string;
    status: "success";
    timestamp: string;
}>;

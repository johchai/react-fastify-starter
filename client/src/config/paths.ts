export const paths = {
  root: {
    paths: "/",
    getHref: () => "/"
  },
  auth: {
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`
    },
    register: {
      path: "/auth/register",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`
    }
  },
  account: {
    root: {
      paths: "/account",
      getHref: () => "/account"
    }
  },
  users: {
    root: {
      paths: "/users",
      getHref: () => "/users"
    },
    user: {
      paths: "/users/:userID",
      getHref: (userID: string) => `/users/${userID}`
    }
  },
  posts: {
    root: {
      paths: "/posts",
      getHref: () => "/posts"
    },
    post: {
      paths: "/posts/:postID",
      getHref: (postID: string) => `/posts/${postID}`
    }
  }
};

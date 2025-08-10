import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@client/components";
import { useGetPosts } from "@client/features";

import { Link, useSearchParams } from "react-router";

export const ViewPosts = () => {
  const [searchParams] = useSearchParams();
  const currentPage = +(searchParams.get("page") || 1);

  const postsQuery = useGetPosts({
    query: {
      page: currentPage,
      pageSize: 4
    }
  });

  if (postsQuery.isLoading || postsQuery.isFetching) {
    return <div>Loading posts...</div>;
  }

  // destructure response data
  const { posts = [], meta } = postsQuery.data?.data || {};
  const { page = 1, totalPages = 1, totalItems = 0 } = meta || {};

  return (
    <section className="space-y-4">
      {postsQuery.isError && (
        <div>Error loading posts: {postsQuery.error.message}</div>
      )}

      {posts.length ? (
        <ul className="space-y-2">
          {posts
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((post) => (
              <li key={post.id} className="flex border">
                <Link
                  to={`/posts/${post.id}`}
                  className="size-full p-4 hover:bg-zinc-200"
                >
                  <span className="text-xs">{post.created_at}</span>
                  <h2 className="font-medium">{post.title}</h2>
                  <h3>{post.content}</h3>
                  <span className="text-xs">By {post.user.name}</span>
                </Link>
              </li>
            ))}
        </ul>
      ) : (
        <div>No posts available.</div>
      )}

      <div className="flex flex-row place-content-between items-center">
        <div className="text-center text-sm text-gray-600">
          Page {page} of {totalPages === 0 ? 1 : totalPages} • {totalItems}{" "}
          total posts
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              href={`posts?page=${Math.max(page - 1, 1)}`}
              isDisabled={page <= 1}
            />

            {/* Page Numbers */}
            {totalPages <= 3 ? (
              // Show all pages if 3 or fewer
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`posts?page=${pageNum}`}
                      isActive={pageNum === page}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              )
            ) : (
              // Smart pagination with ellipsis for more than 3 pages
              <>
                {/* Always show first page */}
                <PaginationItem>
                  <PaginationLink href={`posts?page=1`} isActive={page === 1}>
                    1
                  </PaginationLink>
                </PaginationItem>

                {/* Show ellipsis if current page is > 3 */}
                {page > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Show pages around current page */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (pageNum) =>
                      pageNum !== 1 &&
                      pageNum !== totalPages &&
                      Math.abs(pageNum - page) <= 1
                  )
                  .map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`posts?page=${pageNum}`}
                        isActive={pageNum === page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {/* Show ellipsis if current page is < totalPages - 2 */}
                {page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Always show last page if different from first */}
                {totalPages > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href={`posts?page=${totalPages}`}
                      isActive={page === totalPages}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
              </>
            )}

            <PaginationNext
              href={`posts?page=${Math.min(page + 1, totalPages)}`}
              isDisabled={page >= totalPages}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

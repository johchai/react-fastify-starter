import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@client/components";
import { useGetUsers } from "@client/features";
import { cn } from "@client/utils";

import { Link, useSearchParams } from "react-router";

export const ViewUsers = () => {
  const [searchParams] = useSearchParams();
  const currentPage = +(searchParams.get("page") || 1);

  const usersQuery = useGetUsers({
    query: {
      page: currentPage,
      pageSize: 4
    }
  });

  if (usersQuery.isLoading || usersQuery.isFetching) {
    return <div>Loading users...</div>;
  }

  // destructure response data
  const { users = [], meta } = usersQuery.data?.data || {};
  const { page = 1, totalPages = 1, totalItems = 0 } = meta || {};

  return (
    <section className="space-y-4">
      {usersQuery.isError && (
        <div>Error loading users: {usersQuery.error.message}</div>
      )}

      {users.length ? (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className={cn("flex border", user.deleted_at && "opacity-50")}
            >
              <Link
                to={`/users/${user.id}`}
                className="size-full p-4 hover:bg-zinc-200"
              >
                <span className="text-xs">{user.email}</span>
                <div className="flex flex-col">
                  <h2 className="font-medium">{user.name}</h2>
                  <span className="text-xs">{user.role}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No users available.</div>
      )}

      <div className="flex flex-row place-content-between items-center">
        <div className="text-center text-sm text-gray-600">
          Page {page} of {totalPages === 0 ? 1 : totalPages} • {totalItems}{" "}
          total users
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              href={`users?page=${Math.max(page - 1, 1)}`}
              isDisabled={page <= 1}
            />

            {/* Page Numbers */}
            {totalPages <= 3 ? (
              // Show all pages if 3 or fewer
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`users?page=${pageNum}`}
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
                  <PaginationLink href={`users?page=1`} isActive={page === 1}>
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
                        href={`users?page=${pageNum}`}
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
                      href={`users?page=${totalPages}`}
                      isActive={page === totalPages}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
              </>
            )}

            <PaginationNext
              href={`users?page=${Math.min(page + 1, totalPages)}`}
              isDisabled={page >= totalPages}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

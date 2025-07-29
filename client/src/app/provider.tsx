import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MainErrorFallback = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1>Something went wrong</h1>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const queryClient = new QueryClient();

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Spinner here
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

import { QueryClient, isServer } from "@tanstack/react-query";

const createQueryClient = () => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 10 * 60 * 1000,
          gcTime: 20 * 60 * 1000,
        },
      },
    });
};
  
let browserQueryClient: QueryClient | undefined = undefined;
  
export function getQueryClient() {
    if (isServer) {
        // Server: always create a new query client
        return createQueryClient();
    } else {
        // Browser: create a new query client if we don't already have one
        if (!browserQueryClient) browserQueryClient = createQueryClient();
        return browserQueryClient;
    }
};
  
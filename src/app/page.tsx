import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchUsers } from "@/hooks/useUsers";
import { getQueryClient } from "@/providers/getQueryClient";
import { LoadingSpinner, UserList } from "@/components";

export default async function Home() {
  const queryClient = getQueryClient();
  await prefetchUsers(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingSpinner />}>
        <UserList />
      </Suspense>
    </HydrationBoundary>
  );
}

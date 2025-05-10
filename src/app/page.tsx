import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchUsers } from "@/hooks/useUsers";
import { getQueryClient } from "@/providers/getQueryClient";
import { UserList } from "@/components/UserList/UserList";

export default async function Home() {
  const queryClient = getQueryClient();
  await prefetchUsers(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserList />
    </HydrationBoundary>
  );
}

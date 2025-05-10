import { useQuery, QueryClient } from "@tanstack/react-query";
import { User, userSchema } from "@/types/user";
import { fetchClient } from "@/lib/fetchClient";

export const prefetchUsers = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const getUsers = async (): Promise<User[]> => {
  const { data } = await fetchClient.get("/users");

  return userSchema.array().parse(data);
};

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  });
};
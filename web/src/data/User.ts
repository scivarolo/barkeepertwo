import { useRequest } from "@/hooks/useRequest";
import { User } from "@/types/Models";
import { useQuery } from "@tanstack/react-query";

export const userUrls = {
  get: "User/Get",
};

export const userKeys = {
  get: (id: string) => [userUrls.get, { Id: id }] as const,
};

export function useUser(id: string) {
  const queryKey = userKeys.get(id);
  const { get } = useRequest<User>(...queryKey);
  return useQuery({
    queryKey,
    queryFn: () => get(),
    enabled: !!id,
  });
}

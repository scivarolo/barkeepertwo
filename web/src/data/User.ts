import { useRequest } from "@/hooks/useRequest";
import { User } from "@/types/Models";
import { useMutation, useQuery } from "@tanstack/react-query";

export const userUrls = {
  get: "User/Get",
  update: "User/Update",
};

export const userKeys = {
  get: (id: string) => [userUrls.get, { Id: id }] as const,
};

export function useUser(id: string) {
  const queryKey = userKeys.get(id);
  const { get } = useRequest<User, Pick<User, "Id">>(...queryKey);
  return useQuery({
    queryKey,
    queryFn: () => get(),
    enabled: !!id,
  });
}

export function useUpdateUser() {
  const { post } = useRequest<User, Pick<User, "Id" | "DisplayName">>(
    userUrls.update,
  );
  return useMutation<User, Error, Pick<User, "Id" | "DisplayName">>({
    mutationFn: (body) => post(body),
  });
}

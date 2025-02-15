import { useGetRequest, usePostRequest } from "@/hooks/useRequest";
import { User } from "@/types/Models";
import { QueryParams } from "@/types/Request";
import { useAuth0 } from "@auth0/auth0-react";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

export const userUrls = {
  get: "User/Get",
  update: "User/Update",
};

export const userKeys = {
  get: (id: string) => [userUrls.get, { Id: id }] as const,
};

export const userQueries = {
  user: (options: QueryParams<{ id: string }>) => {
    const queryKey = userKeys.get(options.id);
    const queryFn = useGetRequest<User, Pick<User, "Id">>(...queryKey);
    return queryOptions({ queryKey, queryFn, enabled: !!options.id });
  },
};

export function useUser(id: string) {
  const auth = useAuth0();
  return useQuery(userQueries.user({ auth, id }));
}

export function useUpdateUser() {
  const post = usePostRequest<User, Pick<User, "Id" | "DisplayName">>(
    userUrls.update,
  );
  return useMutation<User, Error, Pick<User, "Id" | "DisplayName">>({
    mutationFn: post,
  });
}

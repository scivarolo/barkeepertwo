import { gql, useMutation, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      displayName
    }
  }
`;

export function useUser(id: string | undefined) {
  return useQuery(GET_USER, {
    variables: { id },
    skip: !id,
  });
}

const UPDATE_USER = gql`
  mutation updateUser($user: UpdateUserRequest!) {
    updateUser(user: $user) {
      id
      displayName
    }
  }
`;

export function useUpdateUser() {
  return useMutation(UPDATE_USER);
}

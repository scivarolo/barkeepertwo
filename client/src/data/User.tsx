import { MutationUpdateUserArgs, User } from "@/gql/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
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
  mutation UpdateUser($id: ID!, $displayName: String!) {
    updateUser(id: $id, displayName: $displayName) {
      id
      displayName
    }
  }
`;

export function useUpdateUser() {
  return useMutation<User, MutationUpdateUserArgs>(UPDATE_USER);
}

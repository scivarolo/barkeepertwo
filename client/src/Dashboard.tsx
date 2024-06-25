import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      id
      username
    }
  }
`;

export default function Dashboard() {
  const { user } = useAuth0();

  const backendUser = useQuery(GET_USER, {
    variables: {
      userId: "79e242b5-fc64-47fb-843d-ddb2982f7907",
    },
  });
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        Hey {user?.email} {backendUser.data?.getUser?.username}
      </div>
    </>
  );
}

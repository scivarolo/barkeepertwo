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

export default function Landing() {
  const { user, getAccessTokenSilently } = useAuth0();

  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (!token) {
      getAccessTokenSilently().then((response) => {
        console.log(response);
        setToken(response);
      });
    }
  }, [token]);

  const backendUser = useQuery(GET_USER, {
    variables: {
      userId: "79e242b5-fc64-47fb-843d-ddb2982f7907",
    },
    skip: !token,
    context: {
      headers: {
        authorization: "Bearer " + token,
      },
    },
  });
  return (
    <>
      <div>
        Landing Page. Hey {user?.email} {backendUser.data?.getUser?.username}
      </div>
      ;
    </>
  );
}

import { Client, fetchExchange, cacheExchange, gql } from "urql";
import { authExchange } from "@urql/exchange-auth";

import {
  getRefreshToken,
  getToken,
  saveAuthData,
  clearStorage,
} from "../store/authStore";

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshCredentials($refreshToken: String!) {
    refreshCredentials(refreshToken: $refreshToken) {
      refreshToken
      accessToken
    }
  }
`;

const auth = authExchange(async (utilities) => {
  let accessToken = getToken();
  let refreshToken = getRefreshToken();

  return {
    addAuthToOperation(operation) {
      return accessToken
        ? utilities.appendHeaders(operation, {
            Authorization: `Bearer ${accessToken}`,
          })
        : operation;
    },
    didAuthError(error) {
      return error.graphQLErrors.some(
        (e) => e.extensions?.code === "UNAUTHORIZED"
      );
    },
    willAuthError(operation) {
      // Sync tokens on every operation
      accessToken = getToken();
      refreshToken = getRefreshToken();

      if (!accessToken) {
        // Detect our login mutation and let this operation through:
        return (
          operation.kind !== "mutation" ||
          // Here we find any mutation definition with the "signin" field
          !operation.query.definitions.some((definition) => {
            return (
              definition.kind === "OperationDefinition" &&
              definition.selectionSet.selections.some((node) => {
                // The field name is just an example, since register may also be an exception
                return node.kind === "Field" && node.name.value === "signin";
              })
            );
          })
        );
      }
      return false;
    },
    async refreshAuth() {
      if (refreshToken) {
        const result = await utilities.mutate(REFRESH_TOKEN_MUTATION, {
          refreshToken,
        });

        if (result.data?.refreshCredentials) {
          accessToken = result.data.refreshCredentials.token;
          refreshToken = result.data.refreshCredentials.refreshToken;
          saveAuthData({ accessToken, refreshToken });
          return;
        }
      }

      // This is where auth has gone wrong and we need to clean up and redirect to a login page
      clearStorage();
      window.location.reload();
    },
  };
});

const client = new Client({
  url: "http://localhost:3001/graphql",
  exchanges: [cacheExchange, auth, fetchExchange],
});

export default client;

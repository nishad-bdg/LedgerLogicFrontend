import { gql } from "urql";

export const LOGOUT_MUTATION = gql`
  mutation Logout($userId: Int!) {
    logout(id: $userId) {
      loggedOut
    }
  }
`;

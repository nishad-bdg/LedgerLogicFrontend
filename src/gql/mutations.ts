import { gql } from "urql";

export const LOGOUT_MUTATION = gql`
  mutation Logout($userId: Int!) {
    logout(id: $userId) {
      loggedOut
    }
  }
`;

export const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer($customerInput: CreateCustomerInput!) {
    createCustomer(customerInput: $customerInput)
  }
`;

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: { emailAddress: string };
}

export interface UseCustomerResult {
  customer: Customer | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export declare function useCustomer(): UseCustomerResult;

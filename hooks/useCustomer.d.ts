export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: { emailAddress: string } | null;
  phoneNumber: { phoneNumber: string } | null;
  defaultAddress: {
    address1: string;
    address2: string;
    city: string;
    zoneCode: string;
    zip: string;
    countryCode: string;
  } | null;
}

export interface UseCustomerResult {
  customer: Customer | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export function useCustomer(): UseCustomerResult;

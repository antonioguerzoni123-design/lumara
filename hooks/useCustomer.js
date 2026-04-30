'use client';
import { useUser } from '@clerk/nextjs';

export function useCustomer() {
  const { user, isLoaded, isSignedIn } = useUser();

  const customer = isSignedIn
    ? {
        id: user.id,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        emailAddress: { emailAddress: user.primaryEmailAddress?.emailAddress ?? '' },
      }
    : null;

  return { customer, isLoading: !isLoaded, isLoggedIn: !!isSignedIn };
}

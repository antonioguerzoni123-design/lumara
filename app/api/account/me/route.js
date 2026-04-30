import { currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await currentUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  return Response.json({
    id: user.id,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    emailAddress: { emailAddress: user.primaryEmailAddress?.emailAddress ?? '' },
  });
}

import { auth, clerkClient } from '@clerk/nextjs/server';

export async function PATCH(request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { firstName, lastName } = await request.json();

  const client = await clerkClient();
  const updated = await client.users.updateUser(userId, {
    ...(firstName !== undefined && { firstName }),
    ...(lastName !== undefined && { lastName }),
  });

  return Response.json({
    id: updated.id,
    firstName: updated.firstName ?? '',
    lastName: updated.lastName ?? '',
  });
}

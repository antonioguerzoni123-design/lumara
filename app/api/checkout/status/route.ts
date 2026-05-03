import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const querySchema = z.object({
  session_id: z.string().min(1),
});

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ session_id: searchParams.get('session_id') });
  if (!parsed.success) {
    return Response.json({ error: 'session_id obrigatório.' }, { status: 400 });
  }

  const session = await prisma.checkoutSession.findUnique({
    where: { stripeSessionId: parsed.data.session_id },
    select: { status: true, shopifyOrderName: true, clerkUserId: true },
  });

  if (!session) {
    return Response.json({ error: 'Sessão não encontrada.' }, { status: 404 });
  }

  if (session.clerkUserId !== userId) {
    return Response.json({ error: 'Acesso negado.' }, { status: 403 });
  }

  return Response.json({ status: session.status, shopifyOrderName: session.shopifyOrderName });
}

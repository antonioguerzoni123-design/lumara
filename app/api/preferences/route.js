import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { auth } from '@clerk/nextjs/server';

const FILE = path.join(process.cwd(), 'data', 'preferences.json');

async function read() {
  try { return JSON.parse(await readFile(FILE, 'utf-8')); } catch { return {}; }
}

async function write(data) {
  await writeFile(FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({}, { status: 401 });

  const db = await read();
  return Response.json(db[userId] ?? {});
}

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { preferences } = body;
  if (typeof preferences !== 'object' || preferences === null) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const db = await read();
  db[userId] = { ...(db[userId] ?? {}), ...preferences };
  await write(db);

  return Response.json({ ok: true, preferences: db[userId] });
}

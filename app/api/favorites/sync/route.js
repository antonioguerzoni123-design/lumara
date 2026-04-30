import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { auth } from '@clerk/nextjs/server';

const FILE = path.join(process.cwd(), 'data', 'favorites.json');

async function read() {
  try { return JSON.parse(await readFile(FILE, 'utf-8')); } catch { return {}; }
}

async function write(data) {
  await writeFile(FILE, JSON.stringify(data, null, 2));
}

export async function POST(request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { favorites } = await request.json();
  if (!Array.isArray(favorites)) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const db = await read();
  const merged = new Set([...(db[userId] ?? []), ...favorites]);
  db[userId] = [...merged];
  await write(db);

  return Response.json({ favorites: db[userId] });
}

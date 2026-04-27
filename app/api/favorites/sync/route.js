import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'favorites.json');

async function read() {
  try { return JSON.parse(await readFile(FILE, 'utf-8')); } catch { return {}; }
}

async function write(data) {
  await writeFile(FILE, JSON.stringify(data, null, 2));
}

export async function POST(request) {
  const { customerId, favorites } = await request.json();
  if (!customerId || !Array.isArray(favorites)) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const db = await read();
  const merged = new Set([...(db[customerId] ?? []), ...favorites]);
  db[customerId] = [...merged];
  await write(db);

  return Response.json({ favorites: db[customerId] });
}

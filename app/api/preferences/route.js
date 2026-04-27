import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'preferences.json');

async function read() {
  try { return JSON.parse(await readFile(FILE, 'utf-8')); } catch { return {}; }
}

async function write(data) {
  await writeFile(FILE, JSON.stringify(data, null, 2));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get('customerId');
  if (!customerId) return Response.json({});

  const db = await read();
  return Response.json(db[customerId] ?? {});
}

export async function POST(request) {
  const { customerId, preferences } = await request.json();
  if (!customerId || typeof preferences !== 'object') {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const db = await read();
  db[customerId] = { ...(db[customerId] ?? {}), ...preferences };
  await write(db);

  return Response.json({ ok: true, preferences: db[customerId] });
}

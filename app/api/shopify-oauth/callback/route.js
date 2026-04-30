import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return new NextResponse('Missing code', { status: 400 });
  }

  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  const store = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

  const response = await fetch(`https://${store}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  const data = await response.json();

  if (!data.access_token) {
    return new NextResponse(`Erro: ${JSON.stringify(data)}`, { status: 400 });
  }

  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"><title>Shopify Token</title></head>
      <body style="font-family:sans-serif;max-width:600px;margin:60px auto;padding:0 20px">
        <h2>✅ Token obtido com sucesso</h2>
        <p>Copia o valor abaixo e adiciona ao Vercel como <strong>SHOPIFY_ADMIN_ACCESS_TOKEN</strong>:</p>
        <code style="display:block;background:#f4f4f4;padding:16px;border-radius:8px;word-break:break-all;font-size:14px">${data.access_token}</code>
        <p style="margin-top:24px;color:#888;font-size:13px">Após adicionar ao Vercel, apaga as rotas <code>/api/shopify-oauth</code> do projeto.</p>
      </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}

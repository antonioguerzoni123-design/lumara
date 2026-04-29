const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return Response.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: 'Email inválido.' }, { status: 400 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  const supportEmail = process.env.SUPPORT_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.warn('RESEND_API_KEY not set — support email not sent');
    return Response.json({ ok: true });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: 'Lumara Apoio <apoio@lumarabeauty.com>',
      to: supportEmail,
      replyTo: safeEmail,
      subject: `[Apoio] ${safeSubject} — ${safeName}`,
      html: `
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Assunto:</strong> ${safeSubject}</p>
        <hr />
        <p>${safeMessage}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Support email error:', err);
    return Response.json({ error: 'Erro ao enviar mensagem. Tenta novamente.' }, { status: 500 });
  }
}

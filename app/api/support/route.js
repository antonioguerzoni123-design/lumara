export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return Response.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

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
      replyTo: email,
      subject: `[Apoio] ${subject} — ${name}`,
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Support email error:', err);
    return Response.json({ error: 'Erro ao enviar mensagem. Tenta novamente.' }, { status: 500 });
  }
}

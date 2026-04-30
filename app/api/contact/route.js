export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return new Response(JSON.stringify({ error: 'Todos os campos são obrigatórios.' }), { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'Chave da API Resend não encontrada.' }), { status: 500 });
    }

    const emailHtml = `
      <h1>Novo contato do site</h1>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'contato@alexandriaimobiliaria.com.br',
        to: 'alexandrianegociosimobiliarios@gmail.com',
        cc: 'hebertdev82@gmail.com',
        subject: `Contato via site - ${name}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: `Erro ao enviar email: ${errorText}` }), { status: response.status });
    }

    return new Response(JSON.stringify({ message: 'Email enviado com sucesso.' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro interno ao processar o envio.' }), { status: 500 });
  }
}

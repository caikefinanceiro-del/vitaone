const { Resend } = require('resend');
const resend = new Resend('re_V14Vybp4_NHPeQq7C4DjoFTUiM7QeRRdt');

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
    body { font-family: 'Inter', Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 40px 0; color: #1a1a1a; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 30px; text-align: center; }
    .logo { color: #fff; font-size: 28px; font-weight: 800; letter-spacing: -1px; margin: 0; }
    .logo span { color: #3b82f6; }
    .content { padding: 40px 30px; }
    .greeting { font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 10px; }
    .message { font-size: 16px; line-height: 1.6; color: #475569; margin-bottom: 30px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 30px; }
    .card-title { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-top: 0; margin-bottom: 15px; }
    .data-row { display: flex; margin-bottom: 12px; font-size: 15px; }
    .data-label { width: 100px; color: #64748b; font-weight: 600; }
    .data-value { color: #0f172a; font-weight: 600; }
    .data-password { font-family: monospace; background: #e2e8f0; padding: 2px 8px; border-radius: 4px; letter-spacing: 1px; }
    .btn-container { text-align: center; margin: 40px 0 20px; }
    .btn { display: inline-block; background: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; font-weight: 600; font-size: 16px; border-radius: 8px; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4); }
    .footer { text-align: center; padding: 20px 30px; background: #f8fafc; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">Vita<span>One</span></h1>
    </div>
    <div class="content">
      <h2 class="greeting">Olá, Caike! 👋</h2>
      <p class="message">Estamos muito felizes em ter você conosco. O ambiente digital da <strong>Clínica Teste</strong> foi provisionado com sucesso e sua infraestrutura no plano <strong>Premium</strong> já está ativa e pronta para uso.</p>
      
      <div class="card">
        <h3 class="card-title">Suas Credenciais de Acesso</h3>
        <div class="data-row">
          <span class="data-label">E-mail:</span>
          <span class="data-value">caike.financeiro@gmail.com</span>
        </div>
        <div class="data-row" style="margin-bottom: 0;">
          <span class="data-label">Senha:</span>
          <span class="data-value data-password">SenhaForte123!</span>
        </div>
      </div>
      
      <p class="message" style="font-size: 14px;">Por questões de segurança, recomendamos fortemente que você altere sua senha temporária logo no primeiro acesso ao painel.</p>
      
      <div class="btn-container">
        <a href="https://vitaone.vercel.app" class="btn" style="color: #ffffff;">Acessar meu Painel</a>
      </div>
    </div>
    <div class="footer">
      <p style="margin: 0;">Este é um e-mail automático. Por favor, não responda.</p>
      <p style="margin: 5px 0 0;">&copy; 2026 VitaOne. Todos os direitos reservados.</p>
    </div>
  </div>
</body>
</html>
`;

resend.emails.send({
  from: 'VitaOne <onboarding@resend.dev>',
  to: 'caike.financeiro@gmail.com',
  subject: 'Bem-vindo ao VitaOne - Acesse sua Clínica',
  html: html
}).then(console.log).catch(console.error);

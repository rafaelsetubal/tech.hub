# tech.hub

## Formulário de orçamento

O formulário usa Cloudflare Turnstile antes de enviar os e-mails pelo Resend.

1. No painel do Cloudflare → Turnstile, autorize `techhubvision.com.br` e `www.techhubvision.com.br` no widget. O site redireciona para o domínio com `www`.
2. Na Vercel → Settings → Environment Variables, configure `VITE_TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY` com as chaves do mesmo widget, no ambiente Production. A chave secreta fica apenas no servidor.
3. Configure `RESEND_API_KEY` e `RESEND_FROM` com um remetente de domínio verificado no Resend.
4. Faça um novo deploy depois de alterar as variáveis. A chave pública é incorporada ao JavaScript durante o build.

O servidor registra os códigos de erro do Turnstile nos logs de `/api/send-email`: `invalid-input-secret` indica uma chave secreta inválida; `invalid-input-response` indica token inválido; `timeout-or-duplicate` indica token expirado ou já utilizado. Erros de rede interrompem o envio e permitem tentar novamente com uma nova verificação.

Para desenvolver, rode `npm run dev`. O localhost usa as chaves de teste oficiais do Cloudflare. Os testes automatizados simulam o Cloudflare e o Resend, sem enviar e-mails reais.

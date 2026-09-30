# Willian Moitinho — Nutricionista (Landing Page)

Página de captação de leads (emagrecimento, definição, ganho de massa) com pop-up
de qualificação que envia o lead pra uma planilha do Google Sheets e abre o WhatsApp.
Inclui carrossel de depoimentos (mobile + desktop) e SEO on-page (title, description,
Open Graph, dados estruturados JSON-LD e sinais locais de Londrina).

## Publicar no GitHub Pages
1. Suba o conteúdo desta pasta num repositório do GitHub (o `index.html` na raiz).
2. Vá em **Settings > Pages**.
3. Em "Source", escolha a branch `main` e a pasta `/ (root)`. Salve.
4. Em alguns minutos o site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Conectar o pop-up à planilha (uma vez)
1. Abra a planilha no Google Sheets (já está no Drive, ou importe `planilha/central-de-leads-willian.xlsx`).
2. Em **Extensões > Apps Script**, apague tudo e cole `planilha/apps-script-central-de-leads.gs`.
3. **Implantar > Nova implantação > App da Web** → "Quem pode acessar: Qualquer pessoa" →
   autorize e copie a URL que termina em `/exec`.
4. No `index.html`, cole essa URL em `const SHEET_ENDPOINT='';`.

## Antes de publicar (confirmar)
- Domínio nos metadados/JSON-LD (hoje `https://www.willianmoitinho.com.br/`).
- Horário de atendimento no rodapé (hoje "Seg a Sex, 8h às 18h").
- Link do Perfil da Empresa no Google (rodapé "Ver no Google").
- Número do WhatsApp no pop-up: 5543999803943.

## Origem dos leads (UTMs)
`?utm_source=meta&utm_medium=cpc` → ADS · `?utm_source=instagram&utm_medium=bio` → BIO · sem UTM → DIRETO.

# Guia de Deploy Privilege Pass no Vercel

## Opção 1: Deploy via Vercel CLI (Recomendado)

Esta é a forma mais direta e confiável de fazer deploy.

### Passo 1: Instalar o Vercel CLI

```bash
npm i -g vercel
```

### Passo 2: Autenticar com Vercel

```bash
vercel login
```

Siga as instruções para autenticar sua conta Vercel.

### Passo 3: Fazer Deploy

Na raiz do projeto:

```bash
vercel --prod
```

O Vercel vai:
- Detectar automaticamente a configuração (vite, Node.js)
- Usar o arquivo `vercel.json` que já está configurado
- Build: `npm run build`
- Output: `dist/`

### Passo 4: Obter a URL de Produção

Após o deploy ser concluído, o Vercel exibirá a URL do seu projeto.

Tipicamente: `https://privilege-pass.vercel.app`

---

## Opção 2: Deploy Automático via GitHub

Quando você fizer push para a branch `main`, o GitHub Actions vai:

1. Buildar o projeto
2. Enviar para o Vercel automaticamente

**O que você precisa fazer:**

Configure as seguintes variáveis de ambiente no Vercel:

- Vá para https://vercel.com/account/tokens
- Crie um token de acesso pessoal
- Copie o token
- No GitHub: Settings > Secrets and variables > Actions
- Atualize o secret `VERCEL_TOKEN` com o novo token
- Adicione também:
  - `VERCEL_ORG_ID`: Seu ID de organização/conta no Vercel
  - `VERCEL_PROJECT_ID`: ID do seu projeto no Vercel (obtido após primeira criação)

Depois disso, qualquer commit na branch `main` vai disparar o deployment automático.

---

## Verificando o Deploy

Vá para: https://vercel.com/dashboard

Seu projeto deve aparecer lá com o status e a URL de produção.

---

## Troubleshooting

### Erro: "Could not retrieve Project Settings"

Este erro significa que os secrets do GitHub (VERCEL_ORG_ID ou VERCEL_PROJECT_ID) não estão corretos.

**Solução:**
1. Faça o primeiro deploy via CLI com `vercel --prod`
2. Copie o Project ID que aparece no `.vercel/project.json`
3. Atualize os secrets no GitHub
4. Tente novamente

### Build Falhou

Verifique:
- Node.js versão compatível (recomendado v18+)
- Todas as dependências instaladas: `npm install`
- Build local funciona: `npm run build`

---

## Configuração Atual

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: 18+
- **Framework**: Vite + React

---

## Próximas ações recomendadas

1. Faça seu primeiro deploy via CLI
2. Configure o domínio customizado (opcional)
3. Configure variáveis de ambiente se necessário
4. Configure o GitHub Actions com os secrets corretos

**Status**: Ambiente pronto para deployment! ✅

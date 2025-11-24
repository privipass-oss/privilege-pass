
# Privilege Pass - Status do Projeto & Documentação Técnica
**Versão Atual:** v3.6.2 (Stable Release)
**Data:** 24/05/2024

---

## 1. Credenciais de Acesso (Ambiente de Teste/Dev)

### Admin Principal
- **Login:** `privi.pass@gmail.com`
- **Senha:** `admin`
- **Permissões:** Acesso total a todas as abas.

### Staff (Equipe)
- **Criação:** Deve ser criado via Painel Admin > Configurações > Equipe.
- **Senha:** Definida no momento da criação (obrigatória).
- **Roles:** 'Suporte' (acesso limitado) ou 'Financeiro' (acesso a parceiros/vendas).

---

## 2. Arquitetura do Sistema

### Gerenciamento de Estado (State Management)
O projeto utiliza o padrão **"Lifting State Up"** centralizado no arquivo `App.tsx`.
- **Por que:** Para garantir que os dados persistam ao navegar entre abas (ex: sair do Dashboard e ir para Clientes).
- **Persistência:** Todos os estados críticos (`customers`, `partners`, `transactions`, `adminProfile`) são sincronizados automaticamente com o `localStorage` do navegador.
- **Reset:** Se os dados ficarem corrompidos, limpe o LocalStorage do navegador (`Application > Local Storage > Clear`).

### Módulos Principais

#### A. Client Area (`components/ClientArea.tsx`)
- **Checkout:** Implementa modal de **PIX Preferencial**.
    - PIX: Gera voucher com status 'Processando' imediatamente.
    - Cartão: Redireciona para MercadoPago (Simulação ou Real configurável).
- **Layout:** Utiliza `min-h-screen` e `py-12` para evitar cortes em mobile.
- **Voucher:** Modal de visualização com botões para Apple Wallet (simulado) e Download de Imagem.

#### B. Gestão de Membros (`components/MembersList.tsx`)
- **Geração de Voucher:** Utiliza `html2canvas` para "tirar foto" do componente `VoucherArt`.
    - **Fix Crítico:** Configurado com `useCORS: true` e imagens com `crossOrigin="anonymous"` para evitar tela branca no download.
- **Layout do Modal:** Modais usam `items-start` + `py-20` (não `items-center`) para garantir que o topo nunca seja cortado em telas pequenas.

#### C. Parceiros (`components/PartnersManager.tsx`)
- **Fluxo:** Cadastro Público (`PartnerRegistration`) -> Aprovação Pendente -> Painel do Parceiro.
- **Financeiro:** Transações são geradas como 'Agendado'. Admin clica em 'Confirmar PIX' -> Status muda para 'Pago' e move para histórico.

#### D. Concierge IA (`services/geminiService.ts`)
- Integração com Google Gemini API.
- **Fallback:** Se a chave de API não estiver no `.env`, ele avisa no chat em vez de quebrar a aplicação.

---

## 3. Correções Recentes (Histórico de Bugs Resolvidos)

1.  **Layout Cortado (Mobile/Small Screens):**
    *   *Problema:* Modais centralizados cortavam o topo e o botão "Fechar".
    *   *Solução:* Todos os modais críticos (`MembersList`, `ClientArea`, `Settings`) foram convertidos para "Scrollable Overlay" com margem superior fixa.

2.  **Dados "Zumbis" (Reapareciam após F5):**
    *   *Problema:* O App inicializava com Mocks se o Storage falhasse.
    *   *Solução:* `App.tsx` refatorado para priorizar estritamente o `localStorage`. Se você deletar, fica deletado.

3.  **Login Staff:**
    *   *Problema:* Usuários criados não conseguiam logar.
    *   *Solução:* Adicionado campo `password` na interface `AdminUser` e lógica de verificação no `AuthScreen`.

4.  **QR Code Gigante:**
    *   *Problema:* Imagem quebrava o voucher.
    *   *Solução:* Container travado em `w-32 h-32` com `object-contain`.

---

## 4. Guia para Deploy (Vercel/Netlify)

Este é um projeto **SPA (Single Page Application)** feito com Vite.

### Arquivos de Configuração
1.  **`vite.config.ts`**: Contém o `define: { 'process.env': {} }` para evitar crash em produção ao acessar variáveis de ambiente antigas.
2.  **`netlify.toml` / `vercel.json`**: Contém regras de rewrite (`/*` -> `/index.html`) para que o refresh da página não dê erro 404 (Router Fix).

### Variáveis de Ambiente (Opcionais)
Configure no painel da hospedagem se quiser funcionalidades reais:
- `VITE_MP_PUBLIC_KEY`: Chave Pública do Mercado Pago.
- `VITE_MP_ACCESS_TOKEN`: Token do Mercado Pago.
- `API_KEY`: Chave do Google Gemini (Concierge).

---

## 5. Como Continuar

Para a IA retomar o trabalho, basta ler este arquivo e o `App.tsx`.
**Foco atual:** Estabilidade e UX. Nenhuma funcionalidade crítica pendente.

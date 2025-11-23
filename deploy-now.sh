#!/bin/bash

# Deploy automático Privilege Pass para Vercel
# Este script faz deploy SEM precisar rodar nada na sua máquina
# Apenas faz um commit e pronto!

set -e

echo "  ⚡ Privilege Pass - Deploy Automático Vercel"
echo "================================================"
echo ""
echo "O que fazer AGORA:"
echo ""
echo "1. Vá para: https://vercel.com/account/tokens"
echo "2. Crie um novo Token (copie o token)"
echo ""
echo "3. No GitHub (seu repositório):"
echo "   - Acesse: Settings > Secrets and variables > Actions"
echo "   - Crie/atualize o secret: VERCEL_TOKEN"
echo "   - Cole seu token"
echo ""
echo "4. PRONTO! Cada commit faz deploy automático"
echo ""
echo "A partir de AGORA:"
echo "- Todo push na branch 'main' = Deploy AUTOMÁTICO"
echo "- Seu site fica ONLINE pro mundo inteiro"
echo "- Nenhum comando rodar na máquina"
echo ""
echo "URL do seu site: https://privilege-pass.vercel.app"
echo ""
echo "================================================"
echo "✅ Setup completo! Você está pronto para ação!"

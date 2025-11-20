
import { VoucherPack, Customer } from '../types';

// ==============================================================================
// 🔐 CONFIGURAÇÃO DO MERCADO PAGO
// ==============================================================================
// Chaves configuradas para o ambiente de teste/produção conforme solicitado.
// ==============================================================================

export const MP_ACCESS_TOKEN = process.env.REACT_APP_MP_ACCESS_TOKEN || 'APP_USR-3954676780837934-092919-c2fbb1d054bc8edf42d5fa2dc190b0db-2721762634';
export const MP_PUBLIC_KEY = process.env.REACT_APP_MP_PUBLIC_KEY || 'APP_USR-497689e2-1b8d-4b99-8683-1a60862d2fea';

// ==============================================================================

export const createMercadoPagoPreference = async (pack: VoucherPack, user: Customer) => {
  try {
    // URL dinâmica do seu site (funciona em localhost e produção)
    const returnUrl = window.location.origin;

    // Tratamento do CPF (Remove formatação)
    // Em produção, é ideal pedir o CPF no cadastro. Aqui usamos um genérico de teste se não houver.
    const cleanCPF = "19119119100"; 

    const preferenceData = {
      items: [
        {
          id: pack.id,
          title: `Privilege Pass - ${pack.name}`,
          description: pack.description,
          picture_url: 'https://i.imgur.com/LDoOqS8.png', // Logo do Privilege Pass
          quantity: 1,
          currency_id: 'BRL',
          unit_price: Number(pack.price)
        }
      ],
      payer: {
        name: user.name.split(' ')[0] || 'Cliente',
        surname: user.name.split(' ').slice(1).join(' ') || 'Vip',
        email: user.email,
        phone: {
            area_code: user.phone && user.phone.length > 2 ? user.phone.substring(0,2) : '11',
            number: user.phone && user.phone.length > 2 ? Number(user.phone.replace(/\D/g,'').substring(2)) : 999999999
        },
        identification: {
            type: "CPF",
            number: cleanCPF
        }
      },
      back_urls: {
        success: `${returnUrl}/?status=approved&pack=${pack.id}`,
        failure: `${returnUrl}/?status=failure`,
        pending: `${returnUrl}/?status=pending`
      },
      auto_return: "approved",
      statement_descriptor: "PRIVILEGE",
      external_reference: `ORDER-${Date.now()}-${user.id}`,
      payment_methods: {
          excluded_payment_types: [
              { id: "ticket" } // Remove boleto para aprovação mais rápida (opcional)
          ],
          installments: 12 // Permite até 12x
      }
    };

    // Chamada à API do Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferenceData)
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Erro MP:', data);
        throw new Error(data.message || 'Falha ao criar link de pagamento');
    }

    // Retorna o link de checkout (init_point)
    return data.init_point; 

  } catch (error) {
    console.error('Erro no serviço de pagamento:', error);
    throw error;
  }
};

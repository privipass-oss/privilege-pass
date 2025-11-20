
import { VoucherPack, Customer } from '../types';

const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-6568746972174334-091613-02699308012705124069299634609153-169458457'; // Coloque sua chave real no .env

export const createMercadoPagoPreference = async (pack: VoucherPack, user: Customer) => {
  try {
    // URL de retorno (Onde o cliente volta após pagar)
    // Em produção, mude para seu domínio real (ex: https://privilegepass.com)
    const returnUrl = window.location.origin;

    const preferenceData = {
      items: [
        {
          id: pack.id,
          title: `Privilege Pass - ${pack.name}`,
          description: pack.description,
          picture_url: 'https://i.imgur.com/LDoOqS8.png', // Logo para o checkout
          quantity: 1,
          currency_id: 'BRL',
          unit_price: pack.price
        }
      ],
      payer: {
        name: user.name.split(' ')[0],
        surname: user.name.split(' ').slice(1).join(' ') || 'Cliente',
        email: user.email,
        phone: {
            area_code: user.phone ? user.phone.substring(0,2) : '11',
            number: user.phone ? Number(user.phone.substring(2)) : 999999999
        },
        identification: {
            type: "CPF",
            number: "19119119100" // O MercadoPago exige CPF válido em produção. O ideal é pedir no cadastro.
        }
      },
      back_urls: {
        success: `${returnUrl}/?status=approved&pack=${pack.id}`,
        failure: `${returnUrl}/?status=failure`,
        pending: `${returnUrl}/?status=pending`
      },
      auto_return: "approved",
      statement_descriptor: "PRIVILEGEPASS",
      external_reference: `ORDER-${Date.now()}-${user.id}`, // ID único do pedido
      payment_methods: {
          excluded_payment_types: [
              { id: "ticket" } // Remove boleto se quiser aprovação imediata
          ],
          installments: 12
      }
    };

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
        console.error('MP Error:', data);
        throw new Error(data.message || 'Erro ao criar preferência de pagamento');
    }

    return data.init_point; // URL para redirecionar o cliente

  } catch (error) {
    console.error('Erro no pagamento:', error);
    throw error;
  }
};

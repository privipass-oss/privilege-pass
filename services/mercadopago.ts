export interface PaymentData {
  amount: number;
  description: string;
  email: string;
  title: string;
  quantity: number;
  currency: string;
}

export interface MercadoPagoResponse {
  id: string;
  status: string;
  init_point: string;
  sandbox_init_point: string;
}

const publicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;
const accessToken = import.meta.env.VITE_MERCADOPAGO_ACCESS_TOKEN;

if (!publicKey || !accessToken) {
  console.warn('MercadoPago credentials not configured');
}

export async function createPaymentPreference(
  paymentData: PaymentData
): Promise<MercadoPagoResponse> {
  try {
    const preference = {
      items: [
        {
          title: paymentData.title,
          description: paymentData.description,
          quantity: paymentData.quantity,
          unit_price: paymentData.amount,
          currency_id: paymentData.currency || 'BRL',
        },
      ],
      payer: {
        email: paymentData.email,
      },
      back_urls: {
        success: `${window.location.origin}/payment/success`,
        failure: `${window.location.origin}/payment/failure`,
        pending: `${window.location.origin}/payment/pending`,
      },
      auto_return: 'approved',
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preference),
    });

    if (!response.ok) {
      throw new Error(`MercadoPago API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as MercadoPagoResponse;
  } catch (error) {
    console.error('Error creating payment preference:', error);
    throw error;
  }
}

export async function getPaymentStatus(paymentId: string): Promise<any> {
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch payment status: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw error;
  }
}

export function initMercadoPago(): void {
  if (!publicKey) {
    console.warn('MercadoPago public key not configured');
    return;
  }

  // Initialize MercadoPago checkout
  const script = document.createElement('script');
  script.src = 'https://sdk.mercadopago.com/js/v2';
  script.async = true;
  document.body.appendChild(script);
}

export function openMercadoPagoCheckout(initPoint: string): void {
  if (window.location.hostname === 'localhost') {
    window.open(initPoint + '?preferenceId=', '_blank');
  } else {
    // In production, redirect to the payment page
    window.location.href = initPoint;
  }
}

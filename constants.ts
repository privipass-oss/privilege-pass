
import { Customer, ChartDataPoint, ActivityLog, VoucherPack, AnalyticsData, FlightStatus, PartnerBenefit, Partner, PartnerTransaction, MarketingAsset, FAQItem } from './types';

// --- CONFIGURAÇÃO DE MARCA ---
export const LOGO_URL = "https://placehold.co/400x400/000000/D4AF37?text=P+P"; 

// --- PRODUTOS INICIAIS (Isso pode ser mantido pois são os produtos base) ---
export const VOUCHER_PACKS: VoucherPack[] = [
  { id: 'nac-1', name: 'Brasil Access (1 Acesso)', description: 'Acesso único para conexões rápidas.', type: 'Nacional', accessCount: 1, price: 169.00, features: ['Acesso Imediato', 'Buffet e Bebidas', 'Wi-Fi High-Speed', 'Estadia de 3h'], isActive: true },
  { id: 'nac-2', name: 'Brasil Double (2 Acessos)', description: 'Ideal para ida e volta.', type: 'Nacional', accessCount: 2, price: 297.00, features: ['Economia de 12%', 'Válido por 1 ano', 'Acesso a salas nacionais', 'Pode transferir 1 acesso'], isActive: true },
  { id: 'nac-4', name: 'Brasil Family (4 Acessos)', description: 'Para famílias ou grupos.', type: 'Nacional', accessCount: 4, price: 537.00, features: ['Melhor Custo-Benefício', 'Uso simultâneo', 'Suporte Prioritário', 'Acesso Kids Zone'], isActive: true },
  { id: 'intl-1', name: 'Global One (1 Acesso)', description: 'Acesso a salas internacionais.', type: 'Internacional', accessCount: 1, price: 189.00, features: ['1300+ Salas no Mundo', 'Buffet Premium & Bar', 'Duchas e SPA (onde disp.)', 'Poltronas de Descanso'], isActive: true },
  { id: 'intl-2', name: 'Global Double (2 Acessos)', description: 'Conforto na ida e volta.', type: 'Internacional', accessCount: 2, price: 349.00, features: ['Economia de 8%', 'Rede Dragon Pass', 'Fast Track (onde disp.)', 'Bebidas Importadas'], isActive: true },
  { id: 'intl-4', name: 'Global Family (4 Acessos)', description: 'Experiência VIP Completa.', type: 'Internacional', accessCount: 4, price: 597.00, features: ['Super Desconto (21%)', 'Acesso Família', 'Salas First Class', 'Concierge 24h'], isActive: true }
];

export const PARTNER_BENEFITS: PartnerBenefit[] = [
  { id: '1', name: 'Uber Black', description: 'Voucher de desconto para traslados aeroporto.', discount: 'R$ 50 OFF', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop', category: 'Transporte', code: 'PRIVILEGE50' },
  { id: '2', name: 'Dufry Duty Free', description: 'Desconto em perfumes e bebidas selecionadas.', discount: '15% OFF', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000&auto=format&fit=crop', category: 'Shopping', code: 'VIPDUFRY15' }
];

export const INITIAL_FAQS: FAQItem[] = [
    {
        id: '1',
        category: 'Geral',
        question: "Como utilizo meu Privilege Pass na sala VIP?",
        answer: "É simples. Ao chegar na recepção da sala VIP parceira (rede Dragon Pass), abra seu painel no celular, vá em 'Meus Vouchers', clique no voucher ativo e apresente o QR Code para a recepcionista. Ela irá escanear e liberar sua entrada imediatamente."
    },
    {
        id: '2',
        category: 'Acesso',
        question: "Posso levar acompanhantes?",
        answer: "Sim. Se você possui um pacote com múltiplos acessos (ex: Privilege Family), você pode utilizar seus créditos para liberar a entrada de acompanhantes. Cada pessoa consumirá 1 acesso do seu saldo total. O titular do voucher deve estar presente no momento do acesso."
    },
    {
        id: '3',
        category: 'Geral',
        question: "Qual a validade dos meus acessos?",
        answer: "Seus créditos são válidos por 12 meses (1 ano) a partir da data da compra. Você pode utilizá-los em qualquer data dentro deste período, inclusive em feriados."
    },
    {
        id: '6',
        category: 'Financeiro',
        question: "Posso cancelar minha compra?",
        answer: "Sim. Garantimos o reembolso integral em até 7 dias após a compra, desde que o voucher não tenha sido utilizado. Entre em contato com nosso suporte para solicitar o estorno."
    }
];

// --- DADOS VAZIOS PARA PRODUÇÃO ---
export const MOCK_PARTNERS: Partner[] = [];
export const MOCK_TRANSACTIONS: PartnerTransaction[] = [];
export const MOCK_MARKETING_ASSETS: MarketingAsset[] = [];
export const MOCK_CUSTOMERS: Customer[] = [];

// --- DADOS DE UI (Podem ser mantidos estáticos) ---
export const TOP_LOUNGES = {
  brasil: [
    { airport: 'GRU - Guarulhos', lounges: ['Espaço Safra (T3)', 'Nomad Lounge', 'W Lounge', 'Admirals Club'] },
    { airport: 'GIG - Galeão', lounges: ['Plaza Premium', 'GOL Premium', 'Star Alliance', 'Admirals Club'] },
    { airport: 'CGH - Congonhas', lounges: ['Advantage VIP', 'BRB Coworking', 'Latitude'] },
    { airport: 'BSB - Brasília', lounges: ['VIP Club Doméstico', 'VIP Club Express', 'VIP Club Internacional'] },
  ],
  mundo: [
    { airport: 'DXB - Dubai', lounges: ['Marhaba Lounge', 'Ahlan Business Class', 'Plaza Premium', 'SkyTeam Lounge'] },
    { airport: 'MIA - Miami', lounges: ['Turkish Airlines Lounge', 'LATAM VIP', 'Club America', 'Avianca VIP'] },
    { airport: 'LHR - Londres', lounges: ['Plaza Premium T2', 'No1 Lounge', 'Club Aspire', 'United Club'] },
  ]
};

export const MOCK_FLIGHTS: FlightStatus[] = [
  { flightNumber: 'TP58', airline: 'TAP Air Portugal', origin: 'Brasília (BSB)', destination: 'Lisboa (LIS)', status: 'Embarque', gate: '22', terminal: 'Intl', departureTime: '14:30' },
  { flightNumber: 'AA930', airline: 'American Airlines', origin: 'São Paulo (GRU)', destination: 'Miami (MIA)', status: 'No Horário', gate: '314', terminal: '3', departureTime: '21:15' },
  { flightNumber: 'LA8102', airline: 'LATAM', origin: 'São Paulo (CGH)', destination: 'Rio de Janeiro (SDU)', status: 'Atrasado', gate: '04', terminal: '1', departureTime: '10:45' },
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { name: 'Seg', nacional: 0, internacional: 0 },
  { name: 'Ter', nacional: 0, internacional: 0 },
  { name: 'Qua', nacional: 0, internacional: 0 },
  { name: 'Qui', nacional: 0, internacional: 0 },
  { name: 'Sex', nacional: 0, internacional: 0 },
  { name: 'Sáb', nacional: 0, internacional: 0 },
  { name: 'Dom', nacional: 0, internacional: 0 },
];

export const RECENT_ACTIVITY: ActivityLog[] = [];

export const MOCK_ANALYTICS: AnalyticsData = {
  totalVisitors: 0,
  activeNow: 1,
  bounceRate: '0%',
  avgSession: '0m',
  devices: [
    { name: 'Mobile', value: 100, color: '#D4AF37' },
  ],
  sources: [],
  topCities: [],
  liveSessions: []
};

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'members', label: 'Clientes', icon: 'ShoppingBag' },
  { id: 'products', label: 'Produtos & Preços', icon: 'Tag' },
  { id: 'analytics', label: 'Estatísticas', icon: 'BarChart3' },
  { id: 'partners', label: 'Afiliados/Parceiros', icon: 'Users' },
  { id: 'email', label: 'Email / Marketing', icon: 'Mail' }, // NEW
  { id: 'marketing', label: 'Kit de Divulgação', icon: 'Megaphone' },
  { id: 'benefits', label: 'Clube de Benefícios', icon: 'Gift' },
  { id: 'concierge', label: 'Concierge', icon: 'Plane' },
  { id: 'faq', label: 'Gestão de FAQ', icon: 'HelpCircle' },
  { id: 'settings', label: 'Configurações', icon: 'Settings' },
];

export const TESTIMONIALS = [
  { id: 1, name: 'Camila & Família', role: 'Cliente VIP', text: 'Salvou nossa conexão de 6 horas! As crianças adoraram o espaço kids da sala VIP. Valeu cada centavo.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Ricardo Mendes', role: 'Executivo', text: 'Uso toda semana. Muito mais barato que pagar na porta. O atendimento pelo WhatsApp é impecável.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' }
];


// ... (imports remain)
import { Customer, ChartDataPoint, ActivityLog, VoucherPack, AnalyticsData, FlightStatus, PartnerBenefit, Partner, PartnerTransaction, MarketingAsset } from './types';

// --- CONFIGURAÇÃO DE MARCA ---
export const LOGO_URL = "https://placehold.co/400x400/000000/D4AF37?text=P+P"; 

// ... (VOUCHER_PACKS, PARTNER_BENEFITS, MOCK_PARTNERS, MOCK_TRANSACTIONS remain same)
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
  { id: '2', name: 'Dufry Duty Free', description: 'Desconto em perfumes e bebidas selecionadas.', discount: '15% OFF', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000&auto=format&fit=crop', category: 'Shopping', code: 'VIPDUFRY15' },
  { id: '3', name: 'Fasano Hotels', description: 'Upgrade de quarto mediante disponibilidade.', discount: 'Upgrade', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop', category: 'Hospedagem', code: 'FASANOPRIV' },
  { id: '4', name: 'Sixt Rent a Car', description: 'Locação de carros de luxo com seguro incluso.', discount: '20% OFF', image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1000&auto=format&fit=crop', category: 'Transporte', code: 'SIXT20VIP' }
];

export const MOCK_PARTNERS: Partner[] = [
  { id: 'p1', name: 'João Motorista VIP', email: 'joao.vip@driver.com', phone: '11999991234', instagram: '@joao.vip', category: 'Motorista', pixKey: '11999887766', pixType: 'Telefone', status: 'Ativo', totalSales: 15, totalEarned: 750.00, commissionType: 'Fixed', commissionValue: 50.00, couponCode: 'DRIVERJOAO', avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop' },
  { id: 'p2', name: 'Amanda Travel', email: 'amanda@insta.com', phone: '21988885678', instagram: '@amanda.viaja', category: 'Influencer', pixKey: 'amanda@insta.com', pixType: 'Email', status: 'Ativo', totalSales: 42, totalEarned: 3580.00, commissionType: 'Percentage', commissionValue: 15, couponCode: 'AMANDAVIP', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }
];

export const MOCK_TRANSACTIONS: PartnerTransaction[] = [
  { id: 't1', partnerId: 'p1', customerName: 'Ricardo S.', productName: 'Brasil Access (1 Acesso)', saleValue: 169.00, commissionValue: 50.00, date: 'Hoje, 10:30', status: 'Agendado', scheduledDate: 'Amanhã, 10:30' },
  { id: 't2', partnerId: 'p2', customerName: 'Carla Dias', productName: 'Global Family (4 Acessos)', saleValue: 597.00, commissionValue: 89.55, date: 'Hoje, 09:15', status: 'Agendado', scheduledDate: 'Amanhã, 09:15' },
  { id: 't3', partnerId: 'p1', customerName: 'Marcos V.', productName: 'Brasil Double', saleValue: 297.00, commissionValue: 50.00, date: 'Ontem, 14:20', status: 'Pago', scheduledDate: 'Hoje, 14:20' }
];

export const MOCK_MARKETING_ASSETS: MarketingAsset[] = [
  { id: '1', title: 'Pack Stories 1 (Dourado)', description: 'Sequência de 3 stories focados em benefícios.', type: 'Image', category: 'Stories', thumbnail: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=500&auto=format&fit=crop', url: '#' },
  { id: '2', title: 'Copy para WhatsApp', description: 'Texto persuasivo para enviar a passageiros.', type: 'Text', category: 'Copy', content: 'Cansado de esperar no portão de embarque? ✈️ Com o Privilege Pass, você acessa +1300 Salas VIP no mundo todo! 🥂' },
  { id: '3', title: 'Apresentação Corporativa', description: 'PDF para enviar para empresas.', type: 'PDF', category: 'Documentos', url: '#' }
];

export const TOP_LOUNGES = {
  brasil: [
    { airport: 'GRU - Guarulhos', lounges: ['Espaço Safra (T3)', 'Nomad Lounge', 'W Lounge', 'Admirals Club'] },
    { airport: 'GIG - Galeão', lounges: ['Plaza Premium', 'GOL Premium', 'Star Alliance', 'Admirals Club'] },
    { airport: 'CGH - Congonhas', lounges: ['Advantage VIP', 'BRB Coworking', 'Latitude'] },
    { airport: 'BSB - Brasília', lounges: ['VIP Club Doméstico', 'VIP Club Express', 'VIP Club Internacional'] },
    { airport: 'VCP - Viracopos', lounges: ['Lounge Azul', 'Ambaar Club'] },
    { airport: 'CNF - Confins', lounges: ['Ambaar Lounge Doméstico', 'Ambaar Lounge Internacional'] },
    { airport: 'REC - Recife', lounges: ['Luck Viagens', 'Proair Sala VIP'] },
  ],
  mundo: [
    { airport: 'DXB - Dubai', lounges: ['Marhaba Lounge', 'Ahlan Business Class', 'Plaza Premium', 'SkyTeam Lounge'] },
    { airport: 'MIA - Miami', lounges: ['Turkish Airlines Lounge', 'LATAM VIP', 'Club America', 'Avianca VIP'] },
    { airport: 'LHR - Londres', lounges: ['Plaza Premium T2', 'No1 Lounge', 'Club Aspire', 'United Club'] },
    { airport: 'JFK - Nova York', lounges: ['Primeclass T1', 'Wingtips', 'Air India Maharaja', 'Lufthansa Business'] },
    { airport: 'CDG - Paris', lounges: ['YotelAir', 'Star Alliance', 'Icare Lounge', 'Sheltair'] },
    { airport: 'LIS - Lisboa', lounges: ['ANA Lounge', 'Blue Lounge'] },
    { airport: 'MAD - Madrid', lounges: ['Sala VIP Cibeles', 'Sala VIP Puerta de Alcalá'] },
  ]
};

export const MOCK_FLIGHTS: FlightStatus[] = [
  { flightNumber: 'TP58', airline: 'TAP Air Portugal', origin: 'Brasília (BSB)', destination: 'Lisboa (LIS)', status: 'Embarque', gate: '22', terminal: 'Intl', departureTime: '14:30' },
  { flightNumber: 'AA930', airline: 'American Airlines', origin: 'São Paulo (GRU)', destination: 'Miami (MIA)', status: 'No Horário', gate: '314', terminal: '3', departureTime: '21:15' },
  { flightNumber: 'LA8102', airline: 'LATAM', origin: 'São Paulo (CGH)', destination: 'Rio de Janeiro (SDU)', status: 'Atrasado', gate: '04', terminal: '1', departureTime: '10:45' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Dr. Roberto Alves',
    email: 'roberto.alves@med.com',
    password: '123',
    dragonPassId: 'DP-8829102',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
    totalSpend: 4500,
    location: 'São Paulo, SP',
    lastPurchaseDate: 'Hoje, 10:30',
    activeVouchers: [
      { packName: 'Global Family (4 Acessos)', remainingAccess: 3, totalAccess: 4, status: 'Ativo', purchaseDate: '2024-05-20', qrCodeUrl: 'mock-qr' }
    ]
  },
  {
    id: '2',
    name: 'Fernanda Miller',
    email: 'f.miller@tech.com',
    password: '123',
    dragonPassId: 'DP-1102934',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    totalSpend: 1200,
    location: 'Rio de Janeiro, RJ',
    lastPurchaseDate: 'Ontem',
    activeVouchers: [
      { packName: 'Brasil Double (2 Acessos)', remainingAccess: 0, totalAccess: 2, status: 'Resgatado', purchaseDate: '2024-05-18', qrCodeUrl: 'mock-qr' }
    ]
  },
  {
    id: '3',
    name: 'Carlos Drummond',
    email: 'carlos.d@adv.com',
    password: '123',
    dragonPassId: 'DP-9921002',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    totalSpend: 0,
    location: 'Belo Horizonte, MG',
    lastPurchaseDate: '-',
    activeVouchers: [] 
  }
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { name: 'Seg', nacional: 4000, internacional: 2400 },
  { name: 'Ter', nacional: 3000, internacional: 1398 },
  { name: 'Qua', nacional: 2000, internacional: 9800 },
  { name: 'Qui', nacional: 2780, internacional: 3908 },
  { name: 'Sex', nacional: 1890, internacional: 4800 },
  { name: 'Sáb', nacional: 2390, internacional: 3800 },
  { name: 'Dom', nacional: 3490, internacional: 4300 },
];

export const RECENT_ACTIVITY: ActivityLog[] = [
  { id: '1', text: 'Voucher Internacional (4x) vendido', time: '2 min atrás', type: 'sale', value: '+ R$ 1.200' },
  { id: '2', text: 'Acesso Confirmado: Sala VIP Guarulhos', time: '5 min atrás', type: 'access' },
  { id: '3', text: 'Integração Dragon Pass: Status OK', time: '10 min atrás', type: 'system' },
];

export const MOCK_ANALYTICS: AnalyticsData = {
  totalVisitors: 24590,
  activeNow: 42,
  bounceRate: '32%',
  avgSession: '4m 12s',
  devices: [
    { name: 'Mobile (iOS)', value: 65, color: '#D4AF37' },
    { name: 'Mobile (Android)', value: 25, color: '#806821' },
    { name: 'Desktop', value: 10, color: '#52525B' },
  ],
  sources: [
    { name: 'Instagram', value: 68, icon: 'Instagram' },
    { name: 'Google', value: 15, icon: 'Search' },
    { name: 'Direto', value: 12, icon: 'Link' },
    { name: 'Indicação', value: 5, icon: 'MessageCircle' },
  ],
  topCities: [
    { city: 'São Paulo', country: 'BR', visitors: 8400, percentage: 34 },
    { city: 'Rio de Janeiro', country: 'BR', visitors: 5200, percentage: 21 },
    { city: 'Lisboa', country: 'PT', visitors: 1200, percentage: 5 },
    { city: 'Miami', country: 'US', visitors: 850, percentage: 3 },
  ],
  liveSessions: [
    { id: '1', ip: '189.23.xx.xx', device: 'iPhone 14 Pro', location: 'São Paulo', page: '/checkout', time: 'Agora' },
    { id: '2', ip: '201.12.xx.xx', device: 'Samsung S23', location: 'Brasília', page: '/home', time: '15s atrás' },
  ]
};

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'members', label: 'Clientes', icon: 'ShoppingBag' },
  { id: 'products', label: 'Produtos & Preços', icon: 'Tag' },
  { id: 'analytics', label: 'Estatísticas', icon: 'BarChart3' },
  { id: 'partners', label: 'Afiliados/Parceiros', icon: 'Users' },
  { id: 'marketing', label: 'Kit de Divulgação', icon: 'Megaphone' },
  { id: 'benefits', label: 'Clube de Benefícios', icon: 'Gift' },
  { id: 'concierge', label: 'Concierge', icon: 'Plane' },
  { id: 'settings', label: 'Configurações', icon: 'Settings' },
];

export const TESTIMONIALS = [
  { id: 1, name: 'Camila & Família', role: 'Cliente VIP', text: 'Salvou nossa conexão de 6 horas! As crianças adoraram o espaço kids da sala VIP. Valeu cada centavo.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Ricardo Mendes', role: 'Executivo', text: 'Uso toda semana. Muito mais barato que pagar na porta. O atendimento pelo WhatsApp é impecável.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Juliana Paes', role: 'Travel Influencer', text: 'A curadoria das salas é ótima. Já usei em Paris e Dubai, funcionou perfeitamente.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }
];

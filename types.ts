
import React from 'react';

export type AppMode = 'LANDING' | 'AUTH' | 'CLIENT_AREA' | 'ADMIN_DASHBOARD' | 'PARTNER_REGISTER' | 'PARTNER_DASHBOARD' | 'SUPPORT';
export type AuthMode = 'LOGIN' | 'REGISTER';

export type VoucherType = 'Nacional' | 'Internacional';

export interface VoucherPack {
  id: string;
  name: string; 
  description: string;
  type: VoucherType;
  accessCount: 1 | 2 | 4;
  price: number;
  features: string[];
  isActive?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  password?: string; 
  phone?: string;
  dragonPassId?: string; 
  avatarUrl: string;
  totalSpend: number;
  activeVouchers: {
    packName: string;
    remainingAccess: number;
    totalAccess: number;
    status: 'Ativo' | 'Resgatado' | 'Expirado' | 'Processando';
    purchaseDate: string;
    qrCodeUrl?: string;
    id?: string;
    code?: string; 
    date?: string;
  }[];
  lastPurchaseDate: string;
  location: string;
  vouchers?: any[]; 
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  category: 'Motorista' | 'Influencer' | 'Agência';
  pixKey: string;
  pixType: 'CPF' | 'Email' | 'Telefone' | 'Aleatoria';
  status: 'Ativo' | 'Pendente' | 'Bloqueado';
  totalSales: number;
  totalEarned: number;
  commissionType: 'Fixed' | 'Percentage';
  commissionValue: number;
  couponCode: string;
  avatarUrl: string;
}

export interface PartnerTransaction {
  id: string;
  partnerId: string;
  customerName: string;
  productName: string;
  saleValue: number;
  commissionValue: number;
  date: string;
  status: 'Agendado' | 'Pago' | 'Cancelado';
  scheduledDate: string;
  archived?: boolean; // New field for archiving
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Suporte' | 'Financeiro';
  avatarUrl: string;
  lastActive: string;
  password?: string;
}

export interface MarketingAsset {
  id: string;
  title: string;
  description: string;
  type: 'Image' | 'PDF' | 'Text';
  url?: string; // For images/PDFs
  content?: string; // For text/copy
  thumbnail?: string;
  category: 'Stories' | 'Feed' | 'Documentos' | 'Copy';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: 'Geral' | 'Acesso' | 'Financeiro' | 'Técnico';
}

export interface PartnerBenefit {
  id: string;
  name: string;
  description: string;
  discount: string;
  image: string;
  category: 'Transporte' | 'Shopping' | 'Hospedagem';
  code: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
}

export interface ChartDataPoint {
  name: string;
  nacional: number;
  internacional: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ActivityLog {
  id: string;
  text: string;
  time: string;
  type: 'sale' | 'access' | 'system';
  value?: string;
}

export interface AnalyticsData {
  totalVisitors: number;
  activeNow: number;
  bounceRate: string;
  avgSession: string;
  devices: { name: string; value: number; color: string }[];
  sources: { name: string; value: number; icon: string }[];
  topCities: { city: string; country: string; visitors: number; percentage: number }[];
  liveSessions: { id: string; ip: string; device: string; location: string; page: string; time: string }[];
}

export interface FlightStatus {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  status: 'No Horário' | 'Atrasado' | 'Embarque' | 'Cancelado';
  gate?: string;
  terminal?: string;
  departureTime: string;
}

export type ViewState = 'dashboard' | 'members' | 'concierge' | 'settings' | 'analytics' | 'partners' | 'marketing' | 'benefits' | 'products' | 'travel-hub' | 'faq';

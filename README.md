# Privilege Pass - VIP Lounge Access Platform

![GHBanner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

> **The fastest path to premium travel experiences with Gemini AI** 

Privilege Pass é uma plataforma inovadora que oferece acesso a lounges VIP e benefícios premium através de vouchers digitais, com IA integrada para recomendações personalizadas e integração com MercadoPago para pagamentos.

## Features ✨

- 🤖 **IA Powered Recommendations** - Gemini AI suggests tailored VIP lounge experiences
- 💳 **MercadoPago Integration** - Seamless payment processing
- 🎫 **Digital Vouchers** - Instant access to premium services
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Real-time Updates** - Live lounge availability and pricing
- 🌐 **Multi-language Support** - (Coming soon)

## Quick Start 🚀

### Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Git**
- Google Gemini API Key ([Get here](https://makersuite.google.com/app/apikey))
- MercadoPago Account ([Create here](https://www.mercadopago.com.br))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/privipass-oss/privilege-pass.git
   cd privilege-pass
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with your API keys:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add:
   ```
   # Google Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # MercadoPago API Keys
   VITE_MERCADOPAGO_PUBLIC_KEY=your_public_key_here
   VITE_MERCADOPAGO_ACCESS_TOKEN=your_access_token_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   The app will start at `http://localhost:5173`

## Build for Production 📦

```bash
# Build the project
npm run build

# Preview production build locally
npm run preview
```

## Project Structure 📁

```
privilege-pass/
├── components/          # React components
│   ├── Dashboard/
│   ├── Sidebar/
│   ├── MembersList/
│   ├── Settings/
│   └── ...
├── services/           # API services and utilities
│   ├── gemini.ts      # Gemini AI integration
│   ├── mercadopago.ts # MercadoPago integration
│   └── ...
├── App.tsx            # Main app component
├── types.ts           # TypeScript type definitions
└── constants.ts       # App constants
```

## Technology Stack 🛠️

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **UI Components**: lucide-react
- **AI**: Google Gemini API
- **Payments**: MercadoPago SDK
- **Styling**: Tailwind CSS

## Configuration

### Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key to your `.env.local`

### MercadoPago Setup

1. Create account at [MercadoPago](https://www.mercadopago.com.br)
2. Go to Settings → API Keys
3. Copy your credentials to `.env.local`

## API Reference

### Gemini Integration

```typescript
import { generateAIRecommendation } from './services/gemini';

const recommendation = await generateAIRecommendation(userProfile);
```

### MercadoPago Integration

```typescript
import { processPayment } from './services/mercadopago';

const result = await processPayment(paymentData);
```

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit
```

### Git Workflow

We follow conventional commits:

```bash
git commit -m "feat: Add new feature"
git commit -m "fix: Fix bug"
git commit -m "docs: Update documentation"
```

## Deployment 🚀

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/privipass-oss/privilege-pass)

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Environment Variables (Production)

Set these in your hosting platform:
- `GEMINI_API_KEY`
- `VITE_MERCADOPAGO_PUBLIC_KEY`
- `VITE_MERCADOPAGO_ACCESS_TOKEN`

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

- 📧 Email: support@privilegepass.com
- 💬 Discord: [Join Community](https://discord.gg/privilegepass)
- 🐛 Issues: [GitHub Issues](https://github.com/privipass-oss/privilege-pass/issues)

## Roadmap 🗺️

- [ ] Mobile App (React Native)
- [ ] Multi-language support
- [ ] Advanced AI recommendations
- [ ] Partner integrations
- [ ] Loyalty program
- [ ] Real-time notifications

---

**Made with ❤️ by Privilege Pass Team**

View your app in AI Studio: [https://ai.studio/apps/drive/1cva_9suPqlYqzzV8Xxzu-uM5vKluvZfD](https://ai.studio/apps/drive/1cva_9suPqlYqzzV8Xxzu-uM5vKluvZfD)

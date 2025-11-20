# Privilege Pass - Setup & Deployment Guide

## Local Development Setup

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- npm or yarn
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/privipass-oss/privilege-pass.git
cd privilege-pass
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local .env.local.backup  # backup template
```

Edit `.env.local` with your credentials:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# MercadoPago (Brazil)
VITE_MERCADOPAGO_PUBLIC_KEY=your_public_key_here
VITE_MERCADOPAGO_ACCESS_TOKEN=your_access_token_here
```

#### Get Gemini API Key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy and paste to `.env.local`

#### Get MercadoPago Credentials:
1. Create account at [MercadoPago](https://www.mercadopago.com.br)
2. Go to "Configuraciones" → "Credenciales"
3. Copy your:
   - **Access Token** (your app credentials)
   - **Public Key** (client-side credentials)
4. Paste to `.env.local`

### Step 4: Run Development Server

```bash
npm run dev
# or
yarn dev
```

The app will start at `http://localhost:5173`

## Deployment

### Deploy to Netlify

#### Option 1: Netlify UI (Recommended)

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variables:
   - `GEMINI_API_KEY`
   - `VITE_MERCADOPAGO_PUBLIC_KEY`
   - `VITE_MERCADOPAGO_ACCESS_TOKEN`
7. Click "Deploy site"

#### Option 2: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set GEMINI_API_KEY "your_key"
netlify env:set VITE_MERCADOPAGO_PUBLIC_KEY "your_key"
netlify env:set VITE_MERCADOPAGO_ACCESS_TOKEN "your_token"
netlify deploy
```

### Deploy to Vercel

#### Option 1: Vercel Dashboard

1. Go to [Vercel](https://vercel.com/)
2. Click "New Project"
3. Select your GitHub repository
4. Configure project:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables in "Environment Variables"
6. Click "Deploy"

#### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
# Follow prompts and add environment variables
```

### Deploy to Docker

Create `Dockerfile` in root:

```dockerfile
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

Build and run:

```bash
docker build -t privilege-pass .
docker run -p 3000:3000 \
  -e GEMINI_API_KEY="your_key" \
  -e VITE_MERCADOPAGO_PUBLIC_KEY="your_key" \
  -e VITE_MERCADOPAGO_ACCESS_TOKEN="your_token" \
  privilege-pass
```

## Build for Production

```bash
# Build
npm run build

# Preview production build locally
npm run preview
```

## Troubleshooting

### Issue: "GEMINI_API_KEY is not defined"
**Solution**: Check `.env.local` file exists and contains valid Gemini API key

### Issue: "MercadoPago credentials not configured"
**Solution**: Verify `VITE_MERCADOPAGO_PUBLIC_KEY` and `VITE_MERCADOPAGO_ACCESS_TOKEN` are set

### Issue: Build fails with TypeScript errors
**Solution**: Run `npm run type-check` to verify types

### Issue: Payment checkout not loading
**Solution**: Ensure MercadoPago public key is correct and credentials are active

## Performance Optimization

- Enable GZIP compression on your server
- Use CDN for static assets
- Implement image optimization
- Enable caching headers

## Security

- Never commit `.env.local` to Git
- Rotate API keys regularly
- Use HTTPS in production
- Implement rate limiting for payment endpoints
- Validate all user inputs server-side

## Monitoring

Recommended tools:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **New Relic**: Performance monitoring

## Support

- 📧 Email: support@privilegepass.com
- 📚 [Full Documentation](./README.md)
- 🐛 [Report Issues](https://github.com/privipass-oss/privilege-pass/issues)

---

**Last updated**: November 2024

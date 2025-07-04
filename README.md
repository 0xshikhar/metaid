# 🆔 MetaID - Proof of Card Protocol

<div align="center">
  <img src="https://metaid.vercel.app/logo.png" alt="MetaID Logo" width="200" height="200">
  <h3>Bridge Trust & Privacy with MetaMask Card</h3>
  <p>Deployed at: <a href="https://metaid.vercel.app/" target="_blank">https://metaid.vercel.app/</a></p>
  
  <p>
    <a href="#-demo">Demo</a> •
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-user-flows">User Flows</a>
  </p>
</div>

## 🚀 Demo

MetaID introduces a decentralized identity layer that bridges the gap between trust and privacy using the MetaMask Card. It verifies card ownership and ties a user's identity to their MetaMask wallet by minting a Soulbound NFT (SBT). This untransferable on-chain credential acts as proof of KYC verification while enabling access to rewards, loyalty programs, and platform-specific perks based on transactional and behavioral data, all while preserving user privacy.

<div align="center">
  <!-- Demo Video: <a href="https://metaid.vercel.app/demo.mp4" target="_blank">https://metaid.vercel.app/demo.mp4</a> -->
  🌎 Demo Link - <a href="https://metaid.vercel.app/" target="_blank">https://metaid.vercel.app/</a>

  ### MetaID NFT Contracts
  <a href="https://sepolia.etherscan.io/address/0xa19aadb3b2a2310e8edb9f38afe95626a3003d04" target="_blank">Sepolia Contract</a>

  <a href="https://sepolia.lineascan.build/tx/0xbd012c44a0cf2e1aeabd4babf963ebacd0a6da9314b7c8215ef3e4475a2544e1" target="_blank">Linea Sepolia Contract</a> - pending from last 3 hours - test chains is badly down, not able to transfer tokens between wallets
</div>

## ✨ Features

### 💳 MetaMask Card Verification
- Verifies card ownership and binds the MetaMask Card to the user's wallet
- Secure validation via Stripe payment processing
- Creates a dummy payment of 1 USDC for verification purposes

### 🔒 Soulbound NFT Issuance
- Generates a non-transferable token for verified users
- Encodes identity/KYC data in a privacy-preserving manner
- Future implementation: Advanced Zero-Knowledge Proofs with other user sensitive data

### 🏆 Rewards and Loyalty Engine
- Unlocks spending-based benefits—users earn program rewards based on spending thresholds
- Provides tailored perks tied to specific platforms
- Tracks qualifying conditions for loyalty perks/reward redemption

### 🔄 Cross-Platform Integration
- Offers a common identity layer for various partners (DeFi, gaming, e-commerce, events)
- Facilitates interoperability for KYC-compliant platforms and applications

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Static type-checking
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/UI** - Reusable component library based on Radix UI
- **RainbowKit & wagmi** - Wallet connection and blockchain interaction
- **Framer Motion** - Animation library
- **Stripe** - Payment processing integration
- **Sonner** - Toast notifications

### Backend & Blockchain
- **Solidity** - Smart contract development
- **Hardhat** - Ethereum development environment
- **Ethers.js** - Blockchain interaction library
- **viem** - TypeScript interface for Ethereum

### Design System
- **Glassmorphism** - Translucent UI elements with backdrop blur
- **Responsive design** - Mobile-first approach
- **Dark/Light modes** - Theme toggle support

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MetaMask browser extension with a connected card
- Yarn or npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/0xshikhar/metaid.git
cd metaid
```

2. Install dependencies
```bash
# Frontend
cd frontend
npm install
# or
yarn install
# or
pnpm install
# or
bun install

# Contracts (optional)
cd ../contracts
npm install
```

3. Set up environment variables
```bash
# Create .env.local in frontend directory
cp .env.example .env.local
# Add your environment variables
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📐 Architecture

```
┌─────────────────────────┐           ┌─────────────────────────┐
│                         │           │                         │
│    Client (Next.js)     │◄────────►│   MetaMask Wallet/Card   │
│                         │           │                         │
└───────────┬─────────────┘           └─────────────────────────┘
            │                                      ▲
            │                                      │
            ▼                                      │
┌─────────────────────────┐           ┌─────────────────────────┐
│                         │           │                         │
│     Stripe Payment      │◄────────►│   Ethereum Blockchain    │
│                         │           │                         │
└─────────────────────────┘           └─────────────────────────┘
```

### Frontend Architecture
MetaID is built using a modern tech stack focusing on performance and user experience:

- **App Router Structure**: Leverages Next.js 14 App Router for efficient page rendering
- **Component Library**: Built with Shadcn/UI components for consistent design
- **State Management**: Uses React Query for efficient data fetching and caching
- **Authentication Flow**: Integrated with MetaMask for secure wallet authentication
- **Payment Processing**: Secure card verification through Stripe

### Smart Contract Architecture
The Soulbound NFT implementation:

- **ERC-721 Extension**: Modified to prevent token transfers
- **Metadata Storage**: IPFS integration for decentralized metadata storage
- **Verification Logic**: On-chain verification of card ownership
- **Access Control**: Role-based permissions for minting and verification

## 🔄 User Flows

### Card Verification Flow
```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │     │         │
│ Connect │────►│  Enter  │────►│ Process │────►│ Verify  │────►│  Card   │
│ Wallet  │     │  Card   │     │ Payment │     │ Success │     │ Linked  │
│         │     │ Details │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
```

### NFT Minting Flow
```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │
│ Verified│────►│ Initiate│────►│ Confirm │────►│  NFT    │
│  Card   │     │ Minting │     │   TX    │     │ Minted  │
│         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

### Rewards Access Flow
```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │
│  NFT    │────►│  View   │────►│ Unlock  │────►│ Redeem  │
│ Holder  │     │ Rewards │     │  Perks  │     │ Benefits│
│         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

## 📱 Pages & Components

### Pages
1. **Home / Landing Page**
   - Introduction to MetaID with clean design
   - Features highlights
   - CTA sections for user engagement

2. **Card Verification**
   - Wallet connection interface
   - Secure card details input
   - Stripe payment processing
   - Smart account deployment via MetaMask delegation-toolkit
   - Verification status display

3. **NFT Minting**
   - Soulbound NFT creation process
   - Minting status progress
   - Transaction confirmation
   - Minted NFT display with metadata

4. **Rewards Dashboard**
   - Active & inactive rewards
   - Spending analytics
   - Notification preferences

### Key Components
- **GlassCard**: Glassmorphism-styled container component
- **ConnectWallet**: Wallet connection button using RainbowKit
- **VerificationProgress**: Status tracker for card verification
- **StripeCardForm**: Secure payment input components
- **NFTDisplay**: Component to showcase the minted SBT

## �️ Roadmap

### Phase 1: MVP (Current)
- ✅ MetaMask wallet integration
- ✅ Card verification through Stripe and through smart account via metamask delegation-toolkit
- ✅ Basic Soulbound NFT implementation
- ✅ Simple rewards dashboard

### Phase 2: Enhancement
- 🔄 Privacy improvements with Zero-Knowledge Proofs
- 🔄 Multi-chain support
- � Enhanced rewards engine with partner integrations
- 🔄 Advanced analytics dashboard

### Phase 3: Expansion
- 📝 Developer SDK for platform integration
- 📝 Mobile application
- � Enterprise solutions for KYC verification
- 📝 Governance mechanisms for protocol upgrades

## 👥 Contributors

- [0xShikhar](https://github.com/0xshikhar) - Lead Developer

## 🙏 Acknowledgments

- MetaMask team for wallet and card infrastructure
- Stripe for payment processing capabilities
- The Ethereum community for ongoing innovation in digital identity

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

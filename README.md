# MetaID - Proof of Card Protocol

<div align="center">
  <img src="https://via.placeholder.com/200x200.png?text=MetaID" alt="MetaID Logo" width="200" height="200">
  <h3>Secure Digital Identity Verification through MetaMask Card</h3>
</div>

## 📋 Overview

MetaID is a decentralized identity verification system that leverages MetaMask card details to mint Soulbound NFTs (SBTs) as proof of identity and KYC of a user wallet. The platform provides a secure, privacy-preserving way to verify user identity while accessing rewards across various platforms.

### Core Features

- **MetaMask Card Verification**: Secure verification of MetaMask card ownership
- **Soulbound NFT Minting**: Creation of non-transferable NFTs tied to user identity
- **Rewards Dashboard**: Access to exclusive benefits from partner platforms
- **Privacy-Preserving**: Verification without exposing sensitive personal information

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- MetaMask browser extension with a connected card
- Yarn or npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/metaid.git
cd metaid
```

2. Install dependencies

```bash
cd frontend
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Architecture

MetaID is built with a modern tech stack focusing on performance, user experience, and security.

### Frontend

- **Next.js**: React framework for server-rendered applications
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Animation library for React
- **wagmi & RainbowKit**: Ethereum wallet connection and interaction
- **Radix UI**: Accessible component library for complex UI elements

### Design Language

- **Glassmorphism**: Translucent, blurred background effects for a modern UI
- **Gradient Accents**: Dynamic color gradients to highlight important elements
- **Responsive Layout**: Optimized for all device sizes and orientations
- **Animated Transitions**: Smooth motion design for enhanced user experience

## 📱 Pages & Components

### Pages

1. **Home / Landing Page**
   - Introduction to MetaID with glassmorphism design
   - Features highlights with animation
   - CTA sections for user engagement

2. **Card Verification**
   - Wallet connection interface
   - Card verification process
   - Verification status display

3. **NFT Minting**
   - Soulbound NFT creation process
   - Minting status progress
   - Minted NFT display with metadata

4. **Rewards Dashboard**
   - Active & inactive rewards
   - Spending analytics
   - Notification preferences

5. **Learn More**
   - Detailed explanation of MetaID
   - FAQ section
   - How it works flow

6. **Coming Soon**
   - Preview of upcoming premium features
   - Early access registration

### Reusable Components

- **GlassCard**: Glassmorphism-styled container component
- **ConnectWallet**: Wallet connection button and modal
- **VerificationProgress**: Status tracker for card verification
- **AnimatedGradient**: Dynamic background gradient element

## 🔄 User Flow

1. User connects their MetaMask wallet on the Card Verification page
2. User verifies ownership of their MetaMask card
3. After successful verification, user proceeds to mint a Soulbound NFT
4. The minted NFT serves as proof of identity across platforms
5. User accesses the Rewards Dashboard to view and claim benefits

## 🛠️ Development

### Environment Variables

Create a `.env.local` file in the frontend directory with:

```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
```

### Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 📈 Future Enhancements

- Backend API integration for actual card verification
- Smart contract development for Soulbound NFT minting
- Zero-knowledge proof implementation for enhanced privacy
- Multi-wallet support beyond MetaMask
- Developer SDK for platform integration
- Dynamic reputation system based on on-chain activity

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Your Name - Initial work and development

## 🙏 Acknowledgments

- MetaMask team for wallet and card infrastructure
- The Ethereum community for ongoing innovation in digital identity

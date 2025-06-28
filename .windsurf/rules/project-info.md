---
trigger: manual
---

MetaID is a Proof of Card Protocol leveraging MetaMask card details to mint Soulbound NFTs (SBTs) as proof of identity and KYC. This protocol will streamline identity verification and integrate with platforms for loyalty programs, rewards, and exclusive access.

During the hackathon, we are building the MVP to demonstrate:

MetaMask card verification module
Soulbound NFT issuance
Demo integration for KYC verification and rewards
Frontend Pages
The following frontend pages will be developed for both the MVP and future product launches.

1. Home Page (Landing Page)
Purpose: Introduce MetaID and its features to users.
Features:
Brief description of MetaID and its use cases.
CTA buttons: "Get Started" and "Learn More."
Links to documentation and demo partners.
Privacy and security reassurances.
2. Login/Wallet Connection Page
MVP Focus:
Integrate MetaMask wallet connection to authenticate users and tie the MetaMask card to their wallet.
Future Expansion:
Multiple wallet provider options.
Additional login via email for developers and businesses.
3. Card Verification Page
Purpose: Allow users to link their MetaMask card to the MetaID protocol.
MVP Features:
Fetch MetaMask wallet details linked to the card.
Verify card ownership via on-chain checks.
Display card-related data: card level (basic/premium), linked wallet address.
Future Enhancements:
Support for multiple cards and a card management interface.
ZKP-based card verification flows for privacy.
4. Mint Soulbound NFT (SBT) Page
MVP Focus:
Users mint their personalized SBT as proof of card ownership and KYC completion.
Display NFT metadata including wallet address, user ID, and associated card details.
Future Expansion:
Dynamic NFT generation with reputation updates based on user behavior.
ZKP-based architecture for private minting.
5. Rewards Dashboard
Purpose: Provide users with an overview of rewards and benefits unlocked via MetaID.
MVP Features:
List of partner platforms offering loyalty programs or rewards.
Spending metrics based on verified card usage.
KYC status and reward eligibility overview.
Future Enhancements:
Tier-based rewards system with visual progress indicators.
Direct claim functionality for rewards from integrated partners.
6. Developer/Partner Dashboard (Future Launch)
Purpose: Allow businesses and developers to integrate MetaID verification into their platforms.
Features:
SDK/API documentation for integration.
User analytics and dashboard tracking engagement levels.
Configurable KYC and privacy settings.
Backend Architecture (MVP Focus Only)
Core Components
MetaMask Card Verification Layer

Functionality:
Verify the MetaMask card is linked to the user’s wallet.
Ensure the card details (e.g., ID, expiration) match the wallet signing request.
Technology Stack:
Ethereum Smart Contracts for wallet-card linking.
MetaMask APIs for fetching card data.
Soulbound NFT Issuance System

Functionality:
Mint non-transferable SBT linked to wallet addresses and card details.
Store metadata such as:
Wallet address
Card verification proof
Timestamp of issuance
Encoded KYC details (only ZKP-based preview possible post-MVP).
Technology Stack:
Solidity Smart Contracts for NFT minting.
IPFS for decentralized SBT metadata storage.
Loyalty and Rewards Engine

Functionality:
Record verified user spending data via MetaMask card interactions.
Generate reward eligibility based on thresholds (e.g., total spend > $500 unlocks premium tier).
Technology Stack:
On-chain data fetching using The Graph.
Webhooks for reward partner notifications.
Endpoints for MVP
POST /verify-card

Input: Wallet address, card ID.
Function: Verifies card ownership against the MetaMask API.
Output: Verification success or failure.
POST /mint-sbt

Input: Wallet address, verified card data.
Function: Mints SBT with associated metadata.
Output: Transaction hash and NFT token ID.
GET /rewards-dashboard

Input: Wallet address.
Function: Fetches loyalty rewards based on card and wallet transaction history.
Output: List of unlocked rewards and spending metrics.
Future Development (Beyond MVP)
Privacy-Preserving Enhancements
Implement Zero-Knowledge Proofs (ZKP) to enable private verification of user credentials without exposure.
Mask metadata in SBTs while maintaining verifiability.
Interoperability and SDK
Develop SDKs for developers to integrate MetaID into their systems with on-chain and off-chain verification options.
Create APIs for custom loyalty program definition.
User Reputation System
Build a behavioral score engine:
Spending habits
Platform engagement
Transaction frequency
Update SBTs dynamically with user reputation badges.
Cross-Network Support
Expand support to multi-chain ecosystems (e.g., Polygon, Binance Smart Chain) for broad interoperability.
Gamification Features
Introduce gamified elements such as rewards for completing streaks, spending milestones, and referrals.
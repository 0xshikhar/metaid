"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Shield, CreditCard, BadgeCheck, Award } from "lucide-react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background gradient effects for glassmorphism */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <motion.div
              className="mb-6 p-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <CreditCard className="h-12 w-12 text-cyan-400" />
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              MetaID
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Proof of Card Protocol leveraging MetaMask card details to mint Soulbound NFTs as proof of identity and KYC.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="glass-connect-button backdrop-blur-md bg-white/10 rounded-lg p-1 border border-white/20 shadow-lg">
                <ConnectButton label="Connect Wallet" />
              </div>
              <Link href="/card-verification">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-lg shadow-blue-500/20">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section with Glassmorphism */}
      <section className="py-20 bg-background/60 relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 right-20 w-96 h-96 bg-emerald-500/30 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -left-20 top-60 w-72 h-72 bg-cyan-500/30 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Identity Verification Simplified</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              MetaID provides a seamless and secure way to verify your identity using MetaMask cards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                  <CreditCard className="h-7 w-7 text-cyan-400" />
                </div>
                <CardTitle className="text-xl font-semibold">MetaMask Card Verification</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Link and verify your MetaMask card securely for identity verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our protocol verifies ownership of your MetaMask card and creates a secure link between your card and wallet address without exposing sensitive information.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/card-verification" className="text-cyan-400 text-sm font-medium flex items-center hover:text-cyan-300 transition-colors">
                  Verify Your Card <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
            
            {/* Feature 2 */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                  <BadgeCheck className="h-7 w-7 text-blue-400" />
                </div>
                <CardTitle className="text-xl font-semibold">Soulbound NFT Issuance</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Receive a non-transferable NFT as proof of identity and KYC
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our Soulbound NFTs (SBTs) serve as immutable proof of your verified identity, enabling seamless interaction with compatible platforms without repeatedly sharing personal data.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/mint-nft" className="text-blue-400 text-sm font-medium flex items-center hover:text-blue-300 transition-colors">
                  Mint Your SBT <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
            
            {/* Feature 3 */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                  <Award className="h-7 w-7 text-emerald-400" />
                </div>
                <CardTitle className="text-xl font-semibold">Rewards & Benefits</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Access exclusive rewards and loyalty programs with your verified MetaID
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Enjoy personalized rewards, exclusive access to partner platforms, and loyalty benefits based on your spending habits and engagement across the ecosystem.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/rewards" className="text-emerald-400 text-sm font-medium flex items-center hover:text-emerald-300 transition-colors">
                  Explore Rewards <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section with Advanced Glassmorphism */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-emerald-500/5 backdrop-blur-lg border border-white/20 shadow-xl">
            {/* Animated glass particles */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute -right-20 bottom-40 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Ready to secure your digital identity?</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Join the MetaID ecosystem today and experience the next generation of identity verification and rewards.
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="flex -space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center ring-2 ring-background">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center ring-2 ring-background">
                      <BadgeCheck className="h-5 w-5 text-white" />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center ring-2 ring-background">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Trusted by leading platforms and partners</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/card-verification">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-lg shadow-blue-500/20 px-6">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/learn-more">
                  <Button size="lg" variant="outline" className="border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all px-6">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Indicators Section */}
      <section className="py-16 bg-background/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold text-muted-foreground">Secure, Private, and Trustworthy</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* Security */}
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                <Shield className="h-8 w-8 text-cyan-400" />
              </div>
              <h4 className="font-medium mb-1">Security First</h4>
              <p className="text-sm text-muted-foreground">Your data remains secure and encrypted throughout the verification process</p>
            </div>
            
            {/* Privacy */}
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                <BadgeCheck className="h-8 w-8 text-blue-400" />
              </div>
              <h4 className="font-medium mb-1">Privacy Preserved</h4>
              <p className="text-sm text-muted-foreground">Only prove what&apos;s needed without revealing sensitive personal information</p>
            </div>
            
            {/* Rewards */}
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                <Award className="h-8 w-8 text-emerald-400" />
              </div>
              <h4 className="font-medium mb-1">Rewarding Experience</h4>
              <p className="text-sm text-muted-foreground">Earn rewards and access exclusive benefits through your verified MetaID</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

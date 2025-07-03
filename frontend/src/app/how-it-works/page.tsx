"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Shield, CreditCard, BadgeCheck, Award, CheckCircle2, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

export default function LearnMore() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container mx-auto px-4">
        {/* Background glass effects */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute top-1/4 left-1/3 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="flex flex-col relative z-10">
          <Link href="/" className="self-start mb-8">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
          
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 mb-6">
              Understanding MetaID
            </h1>
            
            <p className="text-xl text-muted-foreground">
              MetaID is a Proof of Card Protocol that leverages MetaMask card details to mint Soulbound NFTs as proof of identity and KYC.
            </p>
          </motion.div>
          
          {/* How It Works Section */}
          <motion.div 
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold">How MetaID Works</h2>
              <p className="text-muted-foreground mt-2">A simple three-step process to secure your digital identity</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/20 transition-all h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                      <CreditCard className="h-6 w-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-xl">Connect & Verify</CardTitle>
                    <CardDescription>Link your MetaMask card to your wallet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Connect your MetaMask wallet and verify your card ownership through our secure protocol. Your card details are verified without exposing sensitive information.
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-xs text-cyan-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Privacy-preserving verification</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/20 transition-all h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                      <BadgeCheck className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">Mint Soulbound NFT</CardTitle>
                    <CardDescription>Create your digital identity token</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Mint a non-transferable Soulbound NFT (SBT) that serves as your digital identity proof. This NFT is permanently tied to your wallet and cannot be transferred.
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-xs text-blue-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Tamper-proof identity verification</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/20 transition-all h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                      <Award className="h-6 w-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-xl">Access Benefits</CardTitle>
                    <CardDescription>Unlock rewards across platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Use your MetaID to access exclusive rewards, loyalty programs, and benefits across partner platforms. Your verified identity enables seamless integration with participating services.
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-xs text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Cross-platform rewards ecosystem</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
          
          {/* FAQ Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Learn more about MetaID and Soulbound NFTs</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-white/10">
                    <AccordionTrigger>What is a Soulbound NFT?</AccordionTrigger>
                    <AccordionContent>
                      Soulbound NFTs (SBTs) are non-transferable tokens that represent identity, credentials, and affiliations. Unlike regular NFTs, they cannot be traded or transferred to another wallet, making them ideal for identity verification, credentials, and reputation.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-white/10">
                    <AccordionTrigger>How is my card data protected?</AccordionTrigger>
                    <AccordionContent>
                      MetaID uses a privacy-preserving verification system that only confirms the ownership of your MetaMask card without storing or exposing sensitive card details. All verification happens through secure, encrypted channels, and no actual card numbers or CVV codes are stored on-chain.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-white/10">
                    <AccordionTrigger>What rewards can I access with MetaID?</AccordionTrigger>
                    <AccordionContent>
                      MetaID enables access to a variety of rewards including cashback on purchases, exclusive NFT drops, reduced fees on DeFi platforms, loyalty programs with partner merchants, and special access to events and services. The rewards ecosystem continues to grow as new partners join.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4" className="border-white/10">
                    <AccordionTrigger>Can I use MetaID for KYC processes?</AccordionTrigger>
                    <AccordionContent>
                      Yes, MetaID serves as a streamlined KYC solution. Once verified, your Soulbound NFT can be used as proof of identity across compatible platforms without requiring you to repeat KYC processes for each service. This significantly simplifies onboarding while maintaining privacy.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5" className="border-white/10">
                    <AccordionTrigger>What happens if I lose access to my wallet?</AccordionTrigger>
                    <AccordionContent>
                      Since Soulbound NFTs cannot be transferred, if you lose access to your wallet, you would need to go through the verification process again with your new wallet. We recommend using secure wallet recovery methods provided by MetaMask to prevent loss of access.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Key Features Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold">Key Features</h2>
              <p className="text-muted-foreground mt-2">What makes MetaID different</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <Shield className="h-5 w-5 text-cyan-400" />
                    </div>
                    <CardTitle className="text-lg">Privacy & Security</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm">End-to-end encryption for all verification processes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm">Zero knowledge proofs for identity verification without revealing personal data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm">No storage of sensitive card details on-chain</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <BadgeCheck className="h-5 w-5 text-emerald-400" />
                    </div>
                    <CardTitle className="text-lg">Seamless Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm">One-click verification across partner platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm">SDK for developers to easily integrate MetaID into their applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm">Cross-chain compatibility for broad ecosystem access</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
          
          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-emerald-500/10 backdrop-blur-lg border border-white/20 shadow-xl p-8">
              <CardContent className="flex flex-col items-center space-y-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Ready to secure your digital identity?</h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Join the MetaID ecosystem today and experience the next generation of identity verification and rewards.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/card-verification">
                    <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-lg shadow-blue-500/20">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

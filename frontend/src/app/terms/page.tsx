"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container mx-auto px-4">
        {/* Background glass effects */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="flex flex-col relative z-10">
          <Link href="/" className="self-start mb-8">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
          
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 mb-6">
              Terms of Service
            </h1>
            
            <p className="text-muted-foreground mb-6">
              Last updated: July 4, 2025
            </p>
          </motion.div>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl mb-8">
            <CardHeader>
              <CardTitle>1. Agreement to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                By accessing and using the MetaID platform (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of the terms, you may not access the Service.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl mb-8">
            <CardHeader>
              <CardTitle>2. MetaID Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                MetaID is a Proof of Card Protocol that leverages MetaMask card details to mint Soulbound NFTs (SBTs) as proof of identity and KYC. Our service provides identity verification, digital credentials, and access to partner rewards programs.
              </p>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl mb-8">
            <CardHeader>
              <CardTitle>3. User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                To use certain features of the Service, you must connect a compatible wallet. You are responsible for maintaining the security of your wallet and private keys.
              </p>
              <p>
                MetaID does not store private keys or have the ability to recover your wallet if you lose access. We strongly recommend following best practices for wallet security and backup.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl mb-8">
            <CardHeader>
              <CardTitle>4. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using MetaID, you agree to our data practices as described in our Privacy Policy.
              </p>
              <p>
                MetaID uses privacy-preserving verification technology to minimize data collection and storage. We only collect information necessary to provide our services.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl mb-8">
            <CardHeader>
              <CardTitle>5. Soulbound NFTs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Soulbound NFTs (SBTs) minted through the MetaID platform are non-transferable digital assets permanently linked to your wallet address. These NFTs represent your verified identity and credentials.
              </p>
              <p>
                By minting a Soulbound NFT, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SBTs cannot be transferred to another wallet address</li>
                <li>If you lose access to your wallet, you will need to complete the verification process again with a new wallet</li>
                <li>MetaID reserves the right to revoke an SBT in cases of fraud or misuse</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl mb-8">
            <CardHeader>
              <CardTitle>6. Limitations of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                To the maximum extent permitted by law, MetaID shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any interruption or cessation of transmission to or from the Service</li>
                <li>Any bugs, viruses, or the like that may be transmitted to or through the Service</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl mb-8">
            <CardHeader>
              <CardTitle>7. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl mb-8">
            <CardHeader>
              <CardTitle>8. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="font-medium">support@metaid.example.com</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

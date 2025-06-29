"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, CreditCard, Check, Loader2 } from "lucide-react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function CardVerification() {
  const { address, isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    cardId: "",
    cardLevel: "",
    walletAddress: "",
  })

  // Mock verification function - in production this would call the API
  const handleVerifyCard = async () => {
    if (!isConnected) return
    
    setIsLoading(true)
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock successful verification
      setCardDetails({
        cardId: "MM-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        cardLevel: Math.random() > 0.5 ? "Premium" : "Basic",
        walletAddress: address || "",
      })
      setIsVerified(true)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container mx-auto px-4">
        {/* Background glass effects */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-40 -left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="flex flex-col items-center justify-center relative z-10">
          <Link href="/" className="self-start mb-8">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
          
          <motion.div
            className="w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-50"></div>
              
              <CardHeader className="relative">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">MetaMask Card Verification</CardTitle>
                    <CardDescription>Link your MetaMask card to create your MetaID</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm border border-white/10">
                  <h3 className="font-medium mb-2">Step 1: Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your MetaMask wallet to begin the verification process.
                  </p>
                  
                  <div className="glass-connect-button backdrop-blur-md bg-white/5 rounded-lg p-1 border border-white/10 shadow-lg w-fit">
                    <ConnectButton label="Connect MetaMask" showBalance={false} />
                  </div>
                </div>
                
                <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm border border-white/10">
                  <h3 className="font-medium mb-2">Step 2: Verify Card Details</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Verify your MetaMask card is linked to this wallet address.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="wallet-address">Connected Wallet Address</Label>
                      <Input 
                        id="wallet-address" 
                        value={address || "Not connected"}
                        disabled 
                        className="bg-white/5 border-white/20"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button 
                        onClick={handleVerifyCard} 
                        disabled={!isConnected || isLoading || isVerified}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 shadow-lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying
                          </>
                        ) : isVerified ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Verified
                          </>
                        ) : (
                          "Verify Card"
                        )}
                      </Button>
                      
                      {!isConnected && (
                        <p className="text-xs text-amber-400">Please connect your wallet first</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {isVerified && (
                  <motion.div 
                    className="rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 backdrop-blur-sm border border-cyan-500/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-medium mb-2 flex items-center gap-2 text-cyan-400">
                      <Check className="h-5 w-5" /> Card Successfully Verified
                    </h3>
                    
                    <div className="space-y-3 mt-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Card ID</Label>
                        <p className="font-mono text-sm">{cardDetails.cardId}</p>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-muted-foreground">Card Level</Label>
                        <p className="text-sm">{cardDetails.cardLevel}</p>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-muted-foreground">Linked Wallet</Label>
                        <p className="font-mono text-sm truncate">{cardDetails.walletAddress}</p>
                      </div>
                      
                      <Separator className="my-3 bg-white/10" />
                      
                      <div className="pt-2">
                        <Link href="/mint-nft">
                          <Button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 shadow-lg">
                            Continue to Mint Your SBT <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
              
              <CardFooter className="relative flex justify-between border-t border-white/10 bg-white/5 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                  <span className="text-xs text-muted-foreground">Secure verification</span>
                </div>
                
                <Link href="/" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors">
                  Learn more about MetaID
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
          
          <div className="mt-8 text-center max-w-md">
            <p className="text-sm text-muted-foreground">
              By verifying your card, you're creating a secure, non-transferable proof of identity that can be used across partnered platforms.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

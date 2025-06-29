"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BadgeCheck, Loader2, Check } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function MintNFT() {
  const { address, isConnected } = useAccount()
  const [isMinting, setIsMinting] = useState(false)
  const [mintProgress, setMintProgress] = useState(0)
  const [isMinted, setIsMinted] = useState(false)
  const [nftDetails, setNftDetails] = useState({
    tokenId: "",
    createdAt: "",
    cardLevel: "",
    walletAddress: "",
  })

  // Mock NFT minting function - in production this would call the API
  const handleMintNFT = async () => {
    if (!isConnected) return
    
    setIsMinting(true)
    setMintProgress(0)
    
    // Simulate minting process with progress updates
    const interval = setInterval(() => {
      setMintProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          
          // Complete the minting process
          setNftDetails({
            tokenId: "SBT-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
            createdAt: new Date().toISOString(),
            cardLevel: Math.random() > 0.5 ? "Premium" : "Basic",
            walletAddress: address || "",
          })
          setIsMinted(true)
          setIsMinting(false)
          
          return 100
        }
        return prev + 10
      })
    }, 400)
  }

  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container mx-auto px-4">
        {/* Background glass effects */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-60 -right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-40 left-10 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="flex flex-col items-center justify-center relative z-10">
          <Link href="/card-verification" className="self-start mb-8">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Card Verification
            </Button>
          </Link>
          
          <motion.div
            className="w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 opacity-50"></div>
              
              <CardHeader className="relative">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                    <BadgeCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Mint Soulbound NFT</CardTitle>
                    <CardDescription>Create your non-transferable identity NFT</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10 flex flex-col items-center">
                  <div className="relative h-48 w-48 mb-4">
                    {!isMinted ? (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <BadgeCheck className="h-16 w-16 text-white/30" />
                      </div>
                    ) : (
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/40 to-emerald-500/40 backdrop-blur-md border border-white/30 overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BadgeCheck className="h-24 w-24 text-white/70" />
                          </div>
                          <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/30 to-transparent">
                            <p className="font-mono text-xs text-white/70 truncate">MetaID: {address?.substring(0, 10)}...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-medium text-lg mb-2">Your Soulbound NFT</h3>
                  <p className="text-sm text-center text-muted-foreground mb-6">
                    This NFT will serve as your proof of identity and MetaMask card ownership.
                    It cannot be transferred and is permanently bound to your wallet address.
                  </p>
                  
                  {!isMinted ? (
                    <div className="w-full">
                      <Button 
                        onClick={handleMintNFT} 
                        disabled={!isConnected || isMinting}
                        className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 shadow-lg"
                      >
                        {isMinting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Minting in Progress...
                          </>
                        ) : (
                          "Mint Your SBT NFT"
                        )}
                      </Button>
                      
                      {isMinting && (
                        <div className="mt-4 space-y-2">
                          <Progress value={mintProgress} className="h-2 bg-white/10" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Processing</span>
                            <span>{mintProgress}%</span>
                          </div>
                        </div>
                      )}
                      
                      {!isConnected && (
                        <p className="text-xs text-amber-400 mt-2 text-center">
                          Please connect your wallet first
                        </p>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      className="w-full space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center justify-center gap-2 text-emerald-400">
                        <Check className="h-5 w-5" /> 
                        <span className="font-medium">Successfully Minted</span>
                      </div>
                      
                      <Link href="/rewards">
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 shadow-lg">
                          View Rewards & Benefits <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                </div>
                
                {isMinted && (
                  <motion.div
                    className="rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Tabs defaultValue="details">
                      <TabsList className="grid grid-cols-2 bg-white/5 border border-white/10">
                        <TabsTrigger value="details">NFT Details</TabsTrigger>
                        <TabsTrigger value="metadata">Metadata</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="details" className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-xs text-muted-foreground">Token ID</h4>
                          <p className="font-mono text-sm">{nftDetails.tokenId}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-xs text-muted-foreground">Minted On</h4>
                          <p className="text-sm">{new Date(nftDetails.createdAt).toLocaleDateString()} at {new Date(nftDetails.createdAt).toLocaleTimeString()}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-xs text-muted-foreground">Card Level</h4>
                          <p className="text-sm">{nftDetails.cardLevel}</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="metadata" className="mt-4">
                        <pre className="bg-black/30 p-3 rounded-md text-xs font-mono overflow-x-auto">
{`{
  "name": "MetaID Soulbound Token",
  "description": "Proof of identity and MetaMask card ownership",
  "image": "ipfs://QmXyz...",
  "attributes": [
    {
      "trait_type": "Card Level",
      "value": "${nftDetails.cardLevel}"
    },
    {
      "trait_type": "Minted Date",
      "value": "${new Date(nftDetails.createdAt).toISOString().split('T')[0]}"
    },
    {
      "trait_type": "Token Type",
      "value": "Soulbound"
    }
  ],
  "owner": "${nftDetails.walletAddress}",
  "soulbound": true
}`}
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                )}
              </CardContent>
              
              <CardFooter className="relative flex justify-between border-t border-white/10 bg-white/5 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-muted-foreground">Non-transferable token</span>
                </div>
                
                <Link href="/" className="text-xs text-muted-foreground hover:text-blue-400 transition-colors">
                  Learn more about SBTs
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
          
          <div className="mt-8 text-center max-w-md">
            <p className="text-sm text-muted-foreground">
              Soulbound tokens are non-transferable NFTs that represent identity, credentials, and achievements in web3.
              Your MetaID SBT allows platforms to verify your identity without exposing sensitive information.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

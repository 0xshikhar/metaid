"use client"

import { useState, useEffect, Suspense} from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BadgeCheck, Loader2, Check } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAccount, useContractRead, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "sonner"
import { parseEther } from "viem"
import { useContractWrite, useTransaction } from "wagmi"

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
import { MetaIDabi } from "@/lib/data/MetaIDabi"

// Contract address (Replace with your deployed contract address on testnet)
const CONTRACT_ADDRESS = "0xa19aadb3b2a2310e8edb9f38afe95626a3003d04"; 

function MintNFTContent() { 
  const { address, isConnected } = useAccount()
  const searchParams = useSearchParams()
  const [isMinting, setIsMinting] = useState(false)
  const [mintProgress, setMintProgress] = useState(0)
  const [isMinted, setIsMinted] = useState(false)
  const [nftDetails, setNftDetails] = useState({
    tokenId: "",
    createdAt: "",
    cardLevel: "",
    walletAddress: "",
  })

  // Extract verification status from URL parameters
  const metamaskCardVerified = searchParams?.get("card_verified") === "true"
  const cardLevel = searchParams?.get("card_level") || "Basic"

  // Set default verification values for other fields
  // In a real app, these would come from backend verification processes
  const ensVerified = false
  const faceVerified = false
  const twitterVerified = false
  const nationality = "Global" // Default value
  const walletScore = 50 // Default score
  const farcasterScore = 0 // Default score

  // Check if user already has a token
  const { data: existingTokenId } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: MetaIDabi,
    functionName: "getUserTokenId",
    args: [address],
    query: {
      enabled: isConnected && !!address
    }
  })

  // Contract mint function with modern wagmi pattern
  const { data: hash, isPending, writeContract } = useWriteContract()

  // Wait for transaction to complete
  const { isLoading: isWaitingForTx, isSuccess: isMintSuccessful, isError, error } = useWaitForTransactionReceipt({
    hash,
  })

  // Handle successful transaction
  useEffect(() => {
    if (isMintSuccessful) {
      setMintProgress(100)
      setIsMinted(true)
      setIsMinting(false)
      toast.success("Your MetaID NFT has been successfully minted!")

      // Get token details
      if (address) {
        // In production, you would fetch the actual token ID here
        setNftDetails({
          tokenId: `MetaID-${Date.now().toString().slice(-8)}`,
          createdAt: new Date().toISOString(),
          cardLevel,
          walletAddress: address,
        })
      }
    }
  }, [isMintSuccessful, address, cardLevel])

  // Handle transaction errors
  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Transaction failed. Please try again.")
      setIsMinting(false)
    }
  }, [isError, error])

  // Update progress indicator during pending/waiting states
  useEffect(() => {
    if (isPending) {
      setMintProgress(30)
    } else if (isWaitingForTx) {
      setMintProgress(60)
    }
  }, [isPending, isWaitingForTx])

  // Determine card level based on verification status
  const getCardLevel = () => {
    if (metamaskCardVerified && ensVerified && faceVerified && twitterVerified) {
      return "Pro"
    } else if (metamaskCardVerified && ensVerified) {
      return "Premium"
    } else {
      return "Basic"
    }
  }

  // Handle the NFT minting process
  const handleMintNFT = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first")
      return
    }

    // Prevent minting if user already has a token
    if (existingTokenId && typeof existingTokenId === "bigint" && existingTokenId > BigInt(0)) {
      toast.error("You already have a MetaID NFT")
      return
    }

    try {
      setIsMinting(true)
      setMintProgress(10)

      // Call the contract's mintMetaID function
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: MetaIDabi,
        functionName: "mintMetaID",
        args: [
          true, // Always set metamaskCardVerified to true for testing
          ensVerified,
          faceVerified,
          twitterVerified,
          nationality,
          BigInt(walletScore),
          BigInt(farcasterScore)
        ],
      })

      // Note: Progress updates are now handled in the useEffect hooks
    } catch (error) {
      console.error("Error minting NFT:", error)
      toast.error("Failed to mint NFT. Please try again.")
      setIsMinting(false)
      setMintProgress(0)
    }
  }

  // Update the button UI based on transaction status
  const renderMintButton = () => {
    if (isPending) {
      return (
        <Button disabled className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 opacity-80">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirm in Wallet...
        </Button>
      )
    }

    if (isWaitingForTx) {
      return (
        <Button disabled className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 opacity-80">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing Transaction...
        </Button>
      )
    }

    if (existingTokenId && typeof existingTokenId === "bigint" && existingTokenId > BigInt(0)) {
      return (
        <Button disabled className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 opacity-80">
          You Already Have a MetaID
        </Button>
      )
    }

    // if (!metamaskCardVerified) {
    //   return (
    //     <Button disabled className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 opacity-80">
    //       Card Verification Required
    //     </Button>
    //   )
    // }
    return (
      <Button
        onClick={handleMintNFT}
        disabled={isMinting || !isConnected}
        className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:opacity-90 shadow-lg"
      >
        {isMinting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Minting NFT...
          </>
        ) : !isConnected ? (
          "Connect Wallet to Mint"
        ) : (
          "Mint Your MetaID NFT"
        )}
      </Button>
    )
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
                    <Image
                      src="/images/meta-id-card.png"
                      alt="MetaID NFT Card"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">MetaID Soulbound NFT</h3>
                  <p className="text-center text-sm text-muted-foreground mb-6">
                    This unique NFT links your on-chain identity to your verified MetaMask card.
                    It is non-transferable and stays bound to your wallet.
                  </p>

                  <div className="w-full space-y-4">
                    {!isMinted ? (
                      <>
                        <div className="flex flex-col space-y-2 w-full">
                          <div className="flex justify-between text-xs">
                            <span>Card Verification</span>
                            <span className={metamaskCardVerified ? "text-green-400" : "text-orange-400"}>
                              {metamaskCardVerified ? "Verified" : "Pending"}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full ${metamaskCardVerified ? "bg-green-500" : "bg-orange-500"}`} style={{ width: metamaskCardVerified ? "100%" : "0%" }}></div>
                          </div>
                        </div>

                        {isMinting && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Minting Progress</span>
                              <span>{mintProgress}%</span>
                            </div>
                            <Progress value={mintProgress} className="h-2" />
                          </div>
                        )}

                        {renderMintButton()}
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center space-x-2 bg-green-500/20 text-green-400 rounded-md py-3"
                      >
                        <Check className="h-5 w-5" />
                        <span className="font-medium">NFT Successfully Minted!</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {isMinted && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Your MetaID</h4>
                        <p className="text-xs text-muted-foreground">Soul-bound to your wallet</p>
                      </div>
                      <Link href="/rewards">
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 shadow-lg">
                          View Rewards & Benefits <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}

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

                        <div className="space-y-2">
                          <h4 className="text-xs text-muted-foreground">Verification Status</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <div className={`h-2 w-2 rounded-full ${metamaskCardVerified ? "bg-green-500" : "bg-gray-400"}`}></div>
                              <span className="text-xs">Card Verified</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={`h-2 w-2 rounded-full ${ensVerified ? "bg-green-500" : "bg-gray-400"}`}></div>
                              <span className="text-xs">ENS</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={`h-2 w-2 rounded-full ${faceVerified ? "bg-green-500" : "bg-gray-400"}`}></div>
                              <span className="text-xs">Face ID</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={`h-2 w-2 rounded-full ${twitterVerified ? "bg-green-500" : "bg-gray-400"}`}></div>
                              <span className="text-xs">Twitter</span>
                            </div>
                          </div>
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
      "trait_type": "MetaMask Card",
      "value": "${metamaskCardVerified ? "Verified" : "Unverified"}"
    },
    {
      "trait_type": "ENS",
      "value": "${ensVerified ? "Verified" : "Unverified"}"
    },
    {
      "trait_type": "Face ID",
      "value": "${faceVerified ? "Verified" : "Unverified"}"
    },
    {
      "trait_type": "Twitter",
      "value": "${twitterVerified ? "Verified" : "Unverified"}"
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

export default function MintNFT() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>}>
      <MintNFTContent />
    </Suspense>
  )
}

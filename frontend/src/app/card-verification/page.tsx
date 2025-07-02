"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, CreditCard, Check, Loader2, AlertCircle, Wallet } from "lucide-react"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentDelegation, PaymentDelegationResult } from "@/components/PaymentDelegation"

export default function CardVerification() {
  const { address, isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    cardId: "",
    cardLevel: "",
    walletAddress: "",
  })
  
  const [activeTab, setActiveTab] = useState<string>("card")
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })
  
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })

  // Handle credit card payment
  const handleProcessPayment = async () => {
    // Basic validation
    const newErrors: typeof errors = {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: ""
    };
    let hasError = false;
    
    if (!paymentDetails.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
      hasError = true;
    } else if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = "Enter a valid 16-digit card number";
      hasError = true;
    }
    
    if (!paymentDetails.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
      hasError = true;
    }
    
    if (!paymentDetails.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
      hasError = true;
    } else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      newErrors.expiryDate = "Use format MM/YY";
      hasError = true;
    }
    
    if (!paymentDetails.cvv.trim()) {
      newErrors.cvv = "CVV is required";
      hasError = true;
    } else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
      newErrors.cvv = "Enter a valid CVV";
      hasError = true;
    }
    
    setErrors(newErrors);
    
    if (hasError) {
      return;
    }
    
    // Process payment
    setProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate random card ID and level for the demo
      const randomCardId = "MM-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      const randomLevel = Math.random() > 0.5 ? "Premium" : "Basic";
      
      setCardDetails({
        cardId: randomCardId,
        cardLevel: randomLevel,
        walletAddress: address || "",
      });
      
      setPaymentComplete(true);
      setIsVerified(true);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setProcessingPayment(false);
    }
  };

  // Handle smart account verification completion
  const handleSmartAccountVerificationComplete = (result: PaymentDelegationResult) => {
    if (result.success && result.cardId && result.cardLevel) {
      setCardDetails({
        cardId: result.cardId,
        cardLevel: result.cardLevel,
        walletAddress: address || "",
      });
      setIsVerified(true);
    }
  };

  // Handle smart account verification error
  const handleSmartAccountVerificationError = (error: string) => {
    console.error("Smart account verification failed:", error);
  };

  return (
    <>
      <div className="container relative px-6 py-8 mx-auto min-h-screen">
        <div className="flex justify-between mb-8">
          <Link href="/" className="text-sm font-medium flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 px-3 py-1.5">
            <p className="text-xs font-medium">MetaMask Card Verification</p>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 mb-6">
              <h1 className="text-2xl font-bold mb-1">Verify Your MetaMask Card</h1>
              <p className="text-muted-foreground mb-6">
                Verify your card ownership to claim your soul-bound NFT
              </p>
              
              <div className="space-y-8">
                {/* Step 1: Connect Wallet */}
                <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm border border-white/10">
                  <h3 className="font-medium mb-2">Step 1: Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your MetaMask wallet where you want to link your card.
                  </p>
                  
                  <div className="glass-connect-button backdrop-blur-md bg-white/5 rounded-lg p-1 border border-white/10 shadow-lg w-fit">
                    <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
                  </div>
                </div>
                
                {/* Step 2: Card Verification */}
                {isConnected && !isVerified && (
                  <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm border border-white/10">
                    <h3 className="font-medium mb-2">Step 2: Verify Card Ownership</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose how you want to verify ownership of your MetaMask card.
                    </p>
                    
                    <Tabs defaultValue="card" value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="card">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Card Payment
                        </TabsTrigger>
                        <TabsTrigger value="smartAccount">
                          <Wallet className="h-4 w-4 mr-2" />
                          Smart Account
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="card" className="space-y-4">
                        <Alert className="bg-amber-500/10 border-amber-500/20 text-amber-600">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            A dummy payment of 1 USDC will be charged for verification purposes.
                          </AlertDescription>
                        </Alert>
                      
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={paymentDetails.cardNumber}
                              onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                              className={errors.cardNumber ? "border-red-500" : ""}
                            />
                            {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="cardholderName">Cardholder Name</Label>
                            <Input
                              id="cardholderName"
                              placeholder="John Doe"
                              value={paymentDetails.cardholderName}
                              onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
                              className={errors.cardholderName ? "border-red-500" : ""}
                            />
                            {errors.cardholderName && <p className="text-xs text-red-500">{errors.cardholderName}</p>}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                value={paymentDetails.expiryDate}
                                onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                                className={errors.expiryDate ? "border-red-500" : ""}
                              />
                              {errors.expiryDate && <p className="text-xs text-red-500">{errors.expiryDate}</p>}
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                type="password"
                                value={paymentDetails.cvv}
                                onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                                className={errors.cvv ? "border-red-500" : ""}
                              />
                              {errors.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          onClick={handleProcessPayment} 
                          disabled={processingPayment}
                        >
                          {processingPayment ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing Payment...
                            </>
                          ) : (
                            <>
                              <ArrowRight className="mr-2 h-4 w-4" />
                              Process Payment and Verify
                            </>
                          )}
                        </Button>
                      </TabsContent>
                      
                      <TabsContent value="smartAccount">
                        <PaymentDelegation 
                          onComplete={handleSmartAccountVerificationComplete}
                          onError={handleSmartAccountVerificationError}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
                
                {/* Step 3: Success */}
                {isVerified && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-lg bg-gradient-to-r from-green-900/40 to-green-600/20 p-6 backdrop-blur-sm border border-green-500/20"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <Check className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Card Verified Successfully!</h3>
                        <p className="text-muted-foreground mb-6">
                          Your MetaMask card has been successfully linked to your wallet address.
                          Your soul-bound NFT has been issued to your wallet.
                        </p>
                        
                        <Card className="backdrop-blur-sm bg-white/5 border-white/10">
                          <CardHeader>
                            <CardTitle>Card Details</CardTitle>
                            <CardDescription>Your MetaMask card information</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Card ID</span>
                              <span className="font-mono text-sm">{cardDetails.cardId}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Card Level</span>
                              <span className="font-medium">{cardDetails.cardLevel}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Linked Address</span>
                              <span className="font-mono text-sm">{`${cardDetails.walletAddress.slice(0, 6)}...${cardDetails.walletAddress.slice(-4)}`}</span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Link href="/rewards">
                              <Button variant="outline" className="w-full">
                                <ArrowRight className="mr-2 h-4 w-4" />
                                View Card Rewards
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

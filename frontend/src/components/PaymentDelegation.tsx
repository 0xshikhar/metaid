import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { deploySmartAccount } from './SmartAccount';
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface PaymentDelegationResult {
    success: boolean;
    smartAccountAddress?: string;
    transactionHash?: string;
    cardId?: string;
    cardLevel?: string;
    error?: string;
}

export interface PaymentDelegationProps {
    onComplete?: (result: PaymentDelegationResult) => void;
    onError?: (error: string) => void;
}

export const PaymentDelegation: React.FC<PaymentDelegationProps> = ({
    onComplete,
    onError
}) => {
    const { address, isConnected } = useAccount();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'initial' | 'deploying' | 'creating' | 'complete' | 'error'>('initial');
    const [deployResult, setDeployResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreatePaymentDelegation = async () => {
        if (!isConnected) {
            setError("Please connect your wallet first");
            setStep('error');
            onError?.("Wallet not connected");
            return;
        }

        try {
            setIsLoading(true);
            setStep('deploying');
            setError(null);

            // Deploy the smart account
            console.log("Starting smart account deployment...");
            const smartAccountResult = await deploySmartAccount();
            setDeployResult(smartAccountResult);

            if (!smartAccountResult.success) {
                throw new Error(smartAccountResult.error || "Failed to deploy smart account");
            }

            setStep('creating');
            console.log("Smart account deployed successfully:", smartAccountResult);

            // Simulate payment delegation via smart account (in a real app, you would make an actual transaction)
            // This is where you'd typically interact with your backend or a smart contract
            console.log("Creating payment delegation...");
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating API call

            // Generate a random card ID for demo purposes
            const randomCardId = "MM-" + Math.random().toString(36).substring(2, 10).toUpperCase();
            const cardLevel = Math.random() > 0.5 ? "Premium" : "Basic";

            setStep('complete');

            // Call the onComplete callback with the result
            const result: PaymentDelegationResult = {
                success: true,
                smartAccountAddress: smartAccountResult.smartAccountAddress,
                transactionHash: smartAccountResult.transactionHash,
                cardId: randomCardId,
                cardLevel: cardLevel
            };

            onComplete?.(result);
        } catch (err: any) {
            console.error("Payment delegation error:", err);
            setStep('error');
            setError(err.message || "Unknown error occurred");
            onError?.(err.message || "Unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <Alert className="bg-amber-500/10 border-amber-500/20 text-amber-600">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    This will create a MetaMask smart account and execute a transaction to verify your card ownership.
                </AlertDescription>
            </Alert>

            <div className="space-y-2">
                <h3 className="text-sm font-medium">Verification Process:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                        {step === 'deploying' && <Loader2 className="h-4 w-4 animate-spin" />}
                        {step === 'complete' && <Check className="h-4 w-4 text-green-500" />}
                        {(step === 'initial' || step === 'creating' || step === 'error') && <span className="h-4 w-4 rounded-full border" />}
                        <span>Deploy smart account wallet</span>
                    </li>
                    <li className="flex items-center gap-2">
                        {step === 'creating' && <Loader2 className="h-4 w-4 animate-spin" />}
                        {step === 'complete' && <Check className="h-4 w-4 text-green-500" />}
                        {(step === 'initial' || step === 'deploying' || step === 'error') && <span className="h-4 w-4 rounded-full border" />}
                        <span>Verify ownership via transaction</span>
                    </li>
                    <li className="flex items-center gap-2">
                        {step === 'complete' && <Check className="h-4 w-4 text-green-500" />}
                        {(step === 'initial' || step === 'deploying' || step === 'creating' || step === 'error') && <span className="h-4 w-4 rounded-full border" />}
                        <span>Link card to your address</span>
                    </li>
                </ul>
            </div>

            {error && (
                <Alert className="bg-red-500/10 border-red-500/20 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Button
                className="w-full"
                disabled={isLoading || !isConnected}
                onClick={handleCreatePaymentDelegation}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {step === 'deploying' ? 'Deploying Smart Account...' : 'Creating Verification...'}
                    </>
                ) : step === 'complete' ? (
                    <>
                        <Check className="mr-2 h-4 w-4" />
                        Verification Complete
                    </>
                ) : (
                    <>
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Verify with Smart Account
                    </>
                )}
            </Button>
        </div>
    );
};

export const createPaymentDelegation = async (
    walletAddress: string
): Promise<PaymentDelegationResult> => {
    try {
        if (!walletAddress) {
            throw new Error('Wallet address is required');
        }

        console.log("Creating payment delegation for wallet:", walletAddress);

        // Deploy smart account
        const smartAccountResult = await deploySmartAccount();

        if (!smartAccountResult.success) {
            throw new Error(smartAccountResult.error || "Smart account deployment failed");
        }

        // Simulate backend verification process
        // In production, you would make an actual API call here
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate a random card ID and level for simulation purposes
        const randomCardId = "MM-" + Math.random().toString(36).substring(2, 10).toUpperCase();
        const cardLevel = Math.random() > 0.5 ? "Premium" : "Basic";

        return {
            success: true,
            smartAccountAddress: smartAccountResult.smartAccountAddress,
            transactionHash: smartAccountResult.transactionHash,
            cardId: randomCardId,
            cardLevel: cardLevel
        };

    } catch (error: any) {
        console.error("Payment delegation error:", error);
        return {
            success: false,
            error: error.message || "Unknown error occurred during payment delegation"
        };
    }
};

export default PaymentDelegation;
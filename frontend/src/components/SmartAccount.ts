import { ethers } from 'ethers';
import { createPublicClient, createWalletClient, http, custom, parseEther, Address } from 'viem';
import { sepolia } from 'viem/chains';
import React, { useState, useEffect } from 'react';
import {
    encodeFunctionData,
    parseAbi
} from 'viem';
import {
    Implementation,
    toMetaMaskSmartAccount,
    createCaveatBuilder,
    createDelegation,
} from '@metamask/delegation-toolkit';
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { createBundlerClient } from 'viem/account-abstraction';


// Types to improve code safety and developer experience
export interface SmartAccountResult {
    success: boolean;
    smartAccountAddress?: string;
    transactionHash?: string;
    userOperationHash?: string;
    error?: string;
}

export interface SmartAccountOptions {
    rpcUrl?: string;
    pimlicoApiKey?: string;
}

/**
 * Deploys a MetaMask smart account for the connected wallet
 * @param options Configuration options for the smart account deployment
 * @returns Promise with the result of the deployment
 */
export async function deploySmartAccount(options: SmartAccountOptions = {}): Promise<SmartAccountResult> {
    console.log('🚀 DEPLOYING METAMASK SMART ACCOUNT');

    // Environment setup with fallbacks
    const rpcUrl = options.rpcUrl || 'https://ethereum-sepolia-rpc.publicnode.com';
    const pimlicoApiKey = options.pimlicoApiKey || process.env.NEXT_PUBLIC_PIMLICO_API_KEY || 'pim_12345678910';
    const bundlerUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${pimlicoApiKey}`;

    try {
        // Check if MetaMask is available
        if (typeof window === 'undefined' || !window.ethereum) {
            console.error('❌ MetaMask not detected');
            return {
                success: false,
                error: 'MetaMask not detected. Please install MetaMask extension and refresh the page.'
            };
        }

        // Get the user's EOA
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (!accounts || accounts.length === 0) {
            console.error('❌ No accounts found');
            return {
                success: false,
                error: 'No accounts found. Please connect your wallet.'
            };
        }

        const userEOA = accounts[0] as Address;
        console.log('👤 Your EOA:', userEOA);

        // Create clients
        const publicClient = createPublicClient({
            chain: sepolia,
            transport: http(rpcUrl)
        });

        const bundlerClient = createBundlerClient({
            transport: http(bundlerUrl),
            chain: sepolia
        });

        const pimlicoClient = createPimlicoClient({
            transport: http(bundlerUrl),
            chain: sepolia
        });

        // Create a custom account for signing with MetaMask
        const userAccount = {
            address: userEOA,
            async signMessage({ message }: { message: string | Uint8Array }) {
                console.log('Signing message for smart account');
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                if (typeof message === 'string') {
                    return await signer.signMessage(message);
                } else {
                    return await signer.signMessage(message);
                }
            },
            async signTypedData({ domain, types, primaryType, message }: any) {
                console.log('Signing typed data for smart account');
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                return await signer.signTypedData(domain, types, message);
            },
            async signTransaction(transaction: any) {
                console.log('Signing transaction for smart account');
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                return await signer.signTransaction(transaction);
            },
            source: 'custom' as const,
            type: 'local' as const
        };

        console.log('🔄 Creating smart account instance...');

        // Create the smart account instance
        const smartAccount = await toMetaMaskSmartAccount({
            client: publicClient,
            implementation: Implementation.Hybrid,
            deployParams: [userEOA, [], [], []], // Using user's EOA
            deploySalt: '0x0000000000000000000000000000000000000000000000000000000000000000',
            signatory: { account: userAccount },
        });

        console.log('✅ Smart account instance created!');
        console.log('📍 Computed address:', smartAccount.address);

        // Check if already deployed
        const code = await publicClient.getCode({ address: smartAccount.address });
        if (code && code !== '0x') {
            console.log('✅ Smart account already deployed at:', smartAccount.address);
            return {
                success: true,
                smartAccountAddress: smartAccount.address,
                error: 'Account already deployed'
            };
        }

        console.log('⚠️ Smart account not deployed yet. Deploying...');

        try {
            // Get gas fees
            const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();

            // Generate nonce
            const nonce = BigInt(Date.now());

            console.log('📡 Sending UserOperation to deploy smart account...');

            // Send UserOperation that will deploy the smart account
            const userOperationHash = await bundlerClient.sendUserOperation({
                account: smartAccount,
                calls: [
                    {
                        to: smartAccount.address, // Self-call to trigger deployment
                        value: parseEther('0'), // No ETH transfer
                        data: '0x' // Empty data
                    }
                ],
                nonce,
                ...fee
            });

            console.log('✅ UserOperation submitted!');
            console.log('🔗 UserOperation hash:', userOperationHash);
            console.log('⏳ Waiting for confirmation...');

            // Wait for confirmation
            const receipt = await bundlerClient.waitForUserOperationReceipt({
                hash: userOperationHash,
            });

            console.log('🎉 SMART ACCOUNT DEPLOYED SUCCESSFULLY!');
            console.log('📍 Contract address:', smartAccount.address);
            console.log('🔗 Transaction hash:', receipt.receipt.transactionHash);
            console.log('⛽ Gas used:', receipt.receipt.gasUsed?.toString());

            // Verify deployment
            const newCode = await publicClient.getCode({ address: smartAccount.address });
            const isDeployed = newCode !== '0x';
            console.log('✅ Deployment verified:', isDeployed ? 'SUCCESS' : 'FAILED');

            return {
                success: isDeployed,
                smartAccountAddress: smartAccount.address,
                transactionHash: receipt.receipt.transactionHash,
                userOperationHash
            };
        } catch (opError: any) {
            console.error('❌ Operation failed:', opError);
            return {
                success: false,
                smartAccountAddress: smartAccount.address,
                error: opError.message || 'Operation failed'
            };
        }
    } catch (error: any) {
        console.error('❌ Deployment failed:', error);

        let errorMessage = error.message || 'Unknown error';

        if (errorMessage.includes('AA24')) {
            errorMessage = 'Signature validation failed. Make sure MetaMask is connected to Sepolia and you have enough ETH for gas.';
        }

        return {
            success: false,
            error: errorMessage
        };
    }
}

// Export the function for use in the application
export default deploySmartAccount;
"use client";

import { useState, useEffect } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
    AddressElement,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StripePaymentFormProps {
    clientSecret: string;
    onSuccess: (paymentIntentId: string) => void;
    onError: (error: string) => void;
}

export function StripePaymentForm({
    clientSecret,
    onSuccess,
    onError,
}: StripePaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!stripe) return;

        // Check if we already have a payment intent ID from the URL
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) return;

        // Retrieve the payment intent status
        stripe
            .retrievePaymentIntent(clientSecret)
            .then(({ paymentIntent }) => {
                if (!paymentIntent) return;

                switch (paymentIntent.status) {
                    case "succeeded":
                        onSuccess(paymentIntent.id);
                        break;
                    case "processing":
                        setMessage("Your payment is processing.");
                        break;
                    case "requires_payment_method":
                        setMessage("Your payment was not successful, please try again.");
                        break;
                    default:
                        setMessage("Something went wrong.");
                        break;
                }
            });
    }, [stripe, onSuccess]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded
            // Make sure to disable form submission until Stripe.js has loaded
            return;
        }

        setIsLoading(true);

        // Confirm the payment
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/card-verification?payment_complete=true`,
            },
            redirect: "if_required",
        });

        if (result.error) {
            // Show error to your customer
            setMessage(result.error.message || "An unexpected error occurred.");
            onError(result.error.message || "Payment failed");
        } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
            // The payment succeeded!
            onSuccess(result.paymentIntent.id);
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
                <Alert variant={message.includes("not") ? "destructive" : "default"}>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            )}

            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

            <Button
                disabled={isLoading || !stripe || !elements}
                type="submit"
                className="w-full"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    "Pay $1.00 USDC"
                )}
            </Button>
        </form>
    );
}

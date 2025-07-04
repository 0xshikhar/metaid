"use client";

import { ReactNode, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripePromise = () => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!key) {
        console.error("Stripe publishable key is not set");
        return null;
    }

    if (!stripePromise && key) {
        stripePromise = loadStripe(key);
    }

    return stripePromise;
};

interface StripeProviderProps {
    children: ReactNode;
}

export const StripeProvider = ({ children }: StripeProviderProps) => {
    const [clientSecret, setClientSecret] = useState<string>("");

    useEffect(() => {
        // This ensures we only initialize Stripe on the client side
        // We don't need to fetch a client secret at this point since we'll do that when the user initiates a payment
        getStripePromise();
    }, []);

    const options = {
        clientSecret,
        // Pass appearance options if needed
        appearance: {
            theme: "stripe" as const,
        },
    };

    return (
        <Elements stripe={getStripePromise()} options={clientSecret ? options : undefined}>
            {children}
        </Elements>
    );
};

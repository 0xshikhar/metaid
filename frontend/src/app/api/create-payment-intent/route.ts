import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2023-10-16",
});

// Define the request schema
const paymentRequestSchema = z.object({
    walletAddress: z.string(),
    cardType: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate request body
        const result = paymentRequestSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid request data" },
                { status: 400 }
            );
        }

        const { walletAddress, cardType = "Standard" } = result.data;

        // Create a PaymentIntent with the specified amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100, // $1.00 in cents
            currency: "usd",
            metadata: {
                walletAddress,
                cardType,
                purpose: "MetaID Card Verification",
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        return NextResponse.json(
            { error: "Error creating payment intent" },
            { status: 500 }
        );
    }
}

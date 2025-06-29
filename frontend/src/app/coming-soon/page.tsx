"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Timer, Tag, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ComingSoon() {
  // Future premium features to be added
  const comingFeatures = [
    {
      title: "Tiered Rewards Program",
      description: "Unlock exclusive benefits based on your spending and engagement level",
      icon: <Tag className="h-5 w-5 text-cyan-400" />,
      comingIn: "Q3 2025"
    },
    {
      title: "Cross-Platform Reputation",
      description: "Earn reputation points that translate to benefits across partner platforms",
      icon: <Sparkles className="h-5 w-5 text-blue-400" />,
      comingIn: "Q4 2025"
    },
    {
      title: "Custom NFT Badges",
      description: "Personalized NFT badges that showcase your achievements and status",
      icon: <Tag className="h-5 w-5 text-emerald-400" />,
      comingIn: "Q1 2026"
    }
  ]

  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container mx-auto px-4">
        {/* Background glass effects */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-20 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="flex flex-col items-center justify-center relative z-10">
          <Link href="/rewards" className="self-start mb-8">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Rewards
            </Button>
          </Link>
          
          <motion.div
            className="w-full max-w-3xl text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Timer className="h-8 w-8 text-blue-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 mb-4">
              Premium Benefits Coming Soon
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re working hard to bring you even more exclusive rewards and premium features.
              Stay tuned for exciting updates!
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {comingFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-blue-500/5 transition-all overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-emerald-500/5 opacity-50"></div>
                
                <CardHeader className="relative">
                  <div className="mb-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                
                <CardFooter className="relative border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Coming in</span>
                  <span className="text-sm font-mono bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {feature.comingIn}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
          
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="max-w-lg mx-auto bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-white/20 shadow-xl p-6">
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Sparkles className="h-6 w-6 text-blue-400" />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Join the waitlist</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Be among the first to experience premium features when they launch
                  </p>
                </div>
                
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 shadow-lg w-full">
                  Get Early Access
                </Button>
              </CardContent>
            </Card>
            
            <p className="text-sm text-muted-foreground mt-6">
              Continue using your current benefits while we build the next generation of MetaID features
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

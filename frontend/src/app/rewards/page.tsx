"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Award, 
  ChevronRight, 
  Zap, 
  ShoppingBag, 
  Ticket, 
  Coffee,
  Plane,
  Tag
} from "lucide-react"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock reward partners data
const rewardPartners = [
  {
    id: 1,
    name: "CryptoShop",
    logo: <ShoppingBag className="h-5 w-5" />,
    reward: "5% cashback on all purchases",
    status: "active",
    color: "emerald",
    isNew: true
  },
  {
    id: 2,
    name: "NFT Marketplace",
    logo: <Ticket className="h-5 w-5" />,
    reward: "Exclusive early access to drops",
    status: "active",
    color: "blue",
    isNew: false
  },
  {
    id: 3,
    name: "DeFi Protocol",
    logo: <Zap className="h-5 w-5" />,
    reward: "Reduced fees (0.1% trading fee)",
    status: "active",
    color: "purple",
    isNew: true
  },
  {
    id: 4,
    name: "Web3 Coffee",
    logo: <Coffee className="h-5 w-5" />,
    reward: "Buy 5, get 1 free at partner locations",
    status: "inactive",
    color: "amber",
    isNew: false
  },
  {
    id: 5,
    name: "Travel Miles",
    logo: <Plane className="h-5 w-5" />,
    reward: "2x points on travel bookings",
    status: "inactive",
    color: "cyan",
    isNew: false
  }
]

// Mock spending data
const spendingData = {
  total: 1250.75,
  thisMonth: 320.50,
  categories: [
    { name: "Shopping", amount: 145.30, percentage: 45 },
    { name: "Services", amount: 95.20, percentage: 30 },
    { name: "Food", amount: 80.00, percentage: 25 }
  ]
}

export default function RewardsDashboard() {
  const { address, isConnected } = useAccount()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  
  // Filter active rewards
  const activeRewards = rewardPartners.filter(partner => partner.status === "active")
  const inactiveRewards = rewardPartners.filter(partner => partner.status === "inactive")
  
  // Helper function to get color class
  const getColorClass = (color) => {
    const colorMap = {
      emerald: "from-emerald-500 to-green-600",
      blue: "from-blue-500 to-indigo-600",
      purple: "from-purple-500 to-fuchsia-600",
      amber: "from-amber-500 to-orange-600",
      cyan: "from-cyan-500 to-sky-600"
    }
    return colorMap[color] || "from-gray-500 to-slate-600"
  }

  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container mx-auto px-4">
        {/* Background glass effects */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-40 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute top-60 left-1/4 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="flex flex-col relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Link href="/mint-nft">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to NFT
              </Button>
            </Link>
            
            <div className="flex items-center gap-3">
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
              <Label htmlFor="notifications" className="text-sm">
                Reward Notifications
              </Label>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-50"></div>
                
                <CardHeader className="relative pb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Rewards Dashboard</CardTitle>
                      <CardDescription>Manage your rewards and benefits</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
                      <Award className="h-8 w-8 text-emerald-400" />
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Basic Tier</h3>
                      <p className="text-xs text-muted-foreground">Your current rewards level</p>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={60} className="h-2 w-24 bg-white/10" />
                        <span className="text-xs text-muted-foreground">60% to Premium</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Active Rewards: {activeRewards.length}</h3>
                    <p className="text-xs text-muted-foreground mb-4">Rewards and benefits currently available to you</p>
                    
                    <div className="space-y-3">
                      {activeRewards.map(partner => (
                        <div 
                          key={partner.id}
                          className="flex items-center justify-between rounded-lg bg-white/5 p-3 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getColorClass(partner.color)} flex items-center justify-center`}>
                              {partner.logo}
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{partner.name}</h4>
                                {partner.isNew && (
                                  <Badge className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border-0">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{partner.reward}</p>
                            </div>
                          </div>
                          
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              className="w-full md:w-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50"></div>
                
                <CardHeader className="relative pb-2">
                  <CardTitle className="text-lg">Spending Overview</CardTitle>
                  <CardDescription>Based on verified transactions</CardDescription>
                </CardHeader>
                
                <CardContent className="relative space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Spent</span>
                      <span className="font-medium">${spendingData.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">This Month</span>
                      <span className="font-medium">${spendingData.thisMonth.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Top Categories</h4>
                    
                    {spendingData.categories.map((category, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>{category.name}</span>
                          <span>${category.amount.toFixed(2)}</span>
                        </div>
                        <Progress value={category.percentage} className="h-1.5 bg-white/10" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Link href="/coming-soon" className="mt-4 block">
                <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-cyan-500/5 transition-all overflow-hidden p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-cyan-400" />
                    <div>
                      <h4 className="font-medium text-sm">Premium Benefits</h4>
                      <p className="text-xs text-muted-foreground">Unlock more rewards</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Card>
              </Link>
            </motion.div>
          </div>

          {/* Coming Soon / Inactive Rewards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-50"></div>
              
              <CardHeader className="relative">
                <CardTitle className="text-lg">Coming Soon</CardTitle>
                <CardDescription>Future rewards and partnership programs</CardDescription>
              </CardHeader>
              
              <CardContent className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inactiveRewards.map(partner => (
                    <div 
                      key={partner.id}
                      className="flex items-center gap-3 rounded-lg bg-white/5 p-3 backdrop-blur-sm border border-white/10"
                    >
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getColorClass(partner.color)}/40 flex items-center justify-center opacity-70`}>
                        {partner.logo}
                      </div>
                      
                      <div>
                        <h4 className="font-medium">{partner.name}</h4>
                        <p className="text-xs text-muted-foreground">{partner.reward}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t border-white/10 bg-white/5">
                <p className="text-xs text-muted-foreground">New reward partners are added regularly</p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
	ChevronDown,
	LayoutDashboard,
	ArrowLeftRight,
	PiggyBank,
	RefreshCw,
	ShieldCheck,
	Menu,
	X,
	Search
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
	{
		name: "Card Verification",
		href: "/card-verification",
		icon: <ArrowLeftRight className="mr-2 h-4 w-4" />,
	},
	{
		name: "Rewards",
		href: "/rewards",
		icon: <RefreshCw className="mr-2 h-4 w-4" />,
	},
	{
		name: "Learn More",
		href: "/learn-more",
		icon: <ShieldCheck className="mr-2 h-4 w-4" />,
	},
	{
		name: "Coming Soon",
		href: "/coming-soon",
		icon: <ShieldCheck className="mr-2 h-4 w-4" />,
	},
	{
		name: "Terms",
		href: "/terms",
		icon: <ShieldCheck className="mr-2 h-4 w-4" />,
	},
];

const Navbar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [searchQuery, setSearchQuery] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			if (isScrolled !== scrolled) {
				setScrolled(isScrolled);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrolled]);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleSearch = () => {
		if (searchQuery.trim()) {
			router.push(`/searching/${searchQuery}`);
			setIsMenuOpen(false);
		}
	};

	return (
		<nav
			className={cn(
				"w-full sticky top-0 z-50 transition-all duration-300",
				scrolled
					? "bg-background/70 backdrop-blur-lg backdrop-saturate-150 border-b border-border/40 shadow-sm"
					: "bg-transparent"
			)}
		>
			<div className="max-w-7xl mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center">
						<Image src="/logo.png" alt="Portal Logo" width={52} height={52} />		
						<div className="text-3xl font-bold bg-gradient-to-r px-2 text-black bg-clip-text text-transparent">
							Portal
						</div>
					</Link>

					{/* Desktop Navigation - hidden on mobile */}
					<div className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => (
							<Link key={link.href} href={link.href}>
								<Button
									variant={pathname === link.href ? "secondary" : "ghost"}
									className={cn(
										"px-4",
										pathname === link.href
											? "bg-secondary/80 backdrop-blur-sm"
											: "hover:bg-primary/10"
									)}
								>
									{link.icon}
									{link.name}
								</Button>
							</Link>
						))}
					</div>

					{/* Desktop Search and Connect - hidden on mobile */}
					<div className="hidden md:flex items-center gap-4">
						{/* <div className="relative">
							<Input
								className="w-[200px] pl-8 h-9 bg-background/50 backdrop-blur-sm border-border/50"
								placeholder="Search..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							/>
							<Search className="absolute left-2 top-2 h-5 w-5 text-muted-foreground" />
						</div> */}
						<div className="glass-connect-button">
							<ConnectButton />
						</div>
					</div>

					{/* Mobile Menu Button - visible only on mobile */}
					<div className="flex md:hidden">
						<Button variant="ghost" size="icon" onClick={toggleMenu}>
							{isMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Menu - slides down when menu is open */}
				<div
					className={cn(
						"md:hidden absolute left-0 right-0 px-4 pb-4 transition-all duration-300 ease-in-out overflow-hidden",
						isMenuOpen
							? "max-h-[500px] bg-background/80 backdrop-blur-md border-b border-border/40"
							: "max-h-0"
					)}
				>
					<div className="flex flex-col space-y-2 pt-2">
						{/* Mobile Search */}
						<div className="relative mb-2">
							<Input
								className="w-full pl-8 h-9 bg-background/50 backdrop-blur-sm border-border/50"
								placeholder="Search..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							/>
							<Search className="absolute left-2 top-2 h-5 w-5 text-muted-foreground" />
						</div>

						{/* Mobile Nav Links */}
						<div className="flex flex-col space-y-1">
							{navLinks.map((link) => (
								<Link key={link.href} href={link.href}>
									<Button
										variant={pathname === link.href ? "secondary" : "ghost"}
										className="w-full justify-start"
										onClick={() => setIsMenuOpen(false)}
									>
										{link.icon}
										{link.name}
									</Button>
								</Link>
							))}
						</div>

						{/* Mobile Connect Button */}
						<div className="pt-2">
							<ConnectButton />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

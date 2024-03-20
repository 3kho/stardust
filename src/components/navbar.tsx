"use client";
import { useSession } from "next-auth/react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { ComputerIcon, Settings, Sparkles } from "lucide-react";
export default function Navigation() {
	const { data: session } = useSession();
	const { name, email, image } = session?.user || {};
	const navigationItems: {
		icon: React.ReactNode;
		label: string;
		href: string;
	}[] = [
		{
			icon: <ComputerIcon />,
			label: "Dashboard",
			href: "/",
		},
		{
			label: "Admin",
			href: "/Dashboard",
			icon: <Settings />,
		},
	];
	return (
		<div className="fixed flex h-16 min-w-full items-center justify-between border-b px-6 backdrop-blur-md">
			<div className="flex items-center justify-start">
				<Sparkles />
				<span className="ml-2 mr-4 text-2xl font-bold">Stardust</span>
				<NavigationMenu className="flex items-center justify-start">
					<NavigationMenuList>
						{navigationItems.map((item, index) => (
							<NavigationMenuItem key={index}>
								<Link href={item.href} legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										<span className="mr-2 flex size-4 items-center justify-center">
											{item.icon}
										</span>{" "}
										{item.label}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<div className="flex justify-end gap-4">
				<ModeToggle />
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={image || ""} />
							<AvatarFallback>
								{name ? name?.charAt(0) : email?.charAt(0)}
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mr-4 mt-4 w-48">
						<DropdownMenuLabel>
							<p>{name || email}</p>
							<p className="text-xs font-light text-muted-foreground">
								{name ? email : name}
							</p>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/auth/logout">Log Out</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}

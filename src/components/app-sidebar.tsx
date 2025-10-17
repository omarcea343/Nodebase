"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";
import { authClient } from "@/lib/auth-client";
import { CreditCardIcon, FolderIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
	{
		title: "Main",
		items: [
			{
				title: "Workflows",
				icon: FolderIcon,
				href: "/workflows",
			},
			{
				title: "Credentials",
				icon: KeyIcon,
				href: "/credentials",
			},
			{
				title: "Executions",
				icon: HistoryIcon,
				href: "/executions",
			},
		],
	},
];

export const AppSidebar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenuItem>
					<SidebarMenuButton asChild className="gap-x-4">
						<Link href="/" prefetch>
							<Image src="/logo.svg" alt="Logo" width={40} height={40} />
							<span className="font-semibold text-xl">Nodebase</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarHeader>
			<SidebarContent>
				{menuItems.map((group) => (
					<SidebarGroup key={group.title}>
						<SidebarGroupContent>
							<SidebarMenu>
								{group.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											tooltip={item.title}
											isActive={
												item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
											}
											asChild
											className="gap-x-4 h-10 px-4">
											<Link href={item.href} prefetch>
												<item.icon className="size-4" />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					{!hasActiveSubscription && !isLoading && (
						<SidebarMenuItem>
							<SidebarMenuButton
								tooltip="Upgrade to Pro"
								className="gap-x-4 h-10 px-4"
								onClick={() => authClient.checkout({ slug: "Nodebase-Pro" })}>
								<StarIcon />
								<span>Upgrade to Pro</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)}
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip="Billing"
							className="gap-x-4 h-10 px-4"
							onClick={() => authClient.customer.portal()}>
							<CreditCardIcon />
							<span>Billing</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip="Sign Out"
							className="gap-x-4 h-10 px-4"
							onClick={() =>
								authClient.signOut({
									fetchOptions: {
										onSuccess: () => {
											router.push("/sign-in");
										},
									},
								})
							}>
							<LogOutIcon />
							<span>Sign Out</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

import prisma from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { polarClient } from "./polar";

const database = prismaAdapter(prisma, {
	provider: "postgresql",
});

export const auth = betterAuth({
	database,
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
	},
	plugins: [
		polar({
			client: polarClient,
			createCustomerOnSignUp: true,
			use: [
				checkout({
					products: [
						{
							productId: "e76de561-8e14-469c-b1c9-122eaa7549b2",
							slug: "Nodebase-Pro",
						},
					],
					successUrl: process.env.POLAR_SUCCESS_URL,
					authenticatedUsersOnly: true,
				}),
				portal(),
			],
		}),
	],
});

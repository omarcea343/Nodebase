import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { polarClient } from "./polar";
import prisma from "./prisma";

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
							slug: "pro",
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

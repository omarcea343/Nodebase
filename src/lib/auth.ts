import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
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
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5, // 5 minutes
		},
	},
	plugins: [nextCookies()],
});

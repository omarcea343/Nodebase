import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
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
});

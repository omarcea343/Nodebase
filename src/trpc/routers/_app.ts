import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
	testAI: protectedProcedure.mutation(async () => {
		await inngest.send({
			name: "execute/ai",
		});

		return { success: true, message: "AI executed successfully" };
	}),
	getWorkflows: protectedProcedure.query(({ ctx }) => {
		return prisma.workflow.findMany();
	}),
	createWorkflow: protectedProcedure.mutation(() => {
		return prisma.workflow.create({
			data: {
				name: "test-workflow",
			},
		});
	}),
});
// export type definition of API
export type AppRouter = typeof appRouter;

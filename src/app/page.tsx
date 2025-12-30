"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogoutButton } from "./logout";
import { toast } from "sonner";

const Home = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { data } = useQuery(trpc.getWorkflows.queryOptions());

	const testAi = useMutation(
		trpc.testAI.mutationOptions({
			onSuccess: () => {
				toast.success("AI Job queued successfully");
			},
		})
	);

	const create = useMutation(
		trpc.createWorkflow.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
			},
		})
	);

	return (
		<div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
			<div>{JSON.stringify(data, null, 2)}</div>
			<Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
				Test AI
			</Button>
			<Button disabled={create.isPending} onClick={() => create.mutate()}>
				Create Workflow
			</Button>
			<LogoutButton />
		</div>
	);
};

export default Home;

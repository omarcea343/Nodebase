import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
	params: Promise<{ executionId: string }>;
}

const Page = async ({ params }: PageProps) => {
	await requireAuth();

	const { executionId } = await params;

	return <h1>Execution Id: {executionId}</h1>;
};

export default Page;

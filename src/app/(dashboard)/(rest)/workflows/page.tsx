import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
	await requireAuth();

	return <p>Worlflows</p>;
};

export default Page;

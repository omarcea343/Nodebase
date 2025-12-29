import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { requireUnAuth } from "@/lib/auth-utils";

const Page = async () => {
	await requireUnAuth();

	return <SignUpForm />;
};

export default Page;

import { SignInForm } from "@/features/auth/components/sign-in-form";
import { requireUnAuth } from "@/lib/auth-utils";

const Page = async () => {
	await requireUnAuth();

	return <SignInForm />;
};

export default Page;

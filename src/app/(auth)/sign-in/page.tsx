import { SignInForm } from "@/features/auth/components/sign-in-form";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
	await requireUnauth();

	return (
		<div>
			<SignInForm />
		</div>
	);
};

export default Page;

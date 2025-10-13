import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
	await requireUnauth();

	return (
		<div>
			<SignUpForm />
		</div>
	);
};

export default Page;

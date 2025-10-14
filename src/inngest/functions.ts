import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

const google = createGoogleGenerativeAI();
const openai = createOpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
	{ id: "execute-ai" },
	{ event: "execute/ai" },
	async ({ event, step }) => {
		const { steps: geminiSteps } = await step.ai.wrap("gemini-generate-text", generateText, {
			model: google("gemini-2.5-flash"),
			system: "You are a helpful assistant.",
			prompt: "What is 2 + 2",
		});

		const { steps: openaiSteps } = await step.ai.wrap("openai-generate-text", generateText, {
			model: openai("gpt-4.1-mini"),
			system: "You are a helpful assistant.",
			prompt: "What is 2 + 2",
		});

		const { steps: anthropicSteps } = await step.ai.wrap("anthropic-generate-text", generateText, {
			model: anthropic("claude-sonnet-4-5"),
			system: "You are a helpful assistant.",
			prompt: "What is 2 + 2",
		});

		return {
			geminiSteps,
			openaiSteps,
			anthropicSteps,
		};
	}
);

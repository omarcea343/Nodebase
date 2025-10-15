// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: "https://348e7387ae00e88611e11834e5ba1843@o4509318757941248.ingest.us.sentry.io/4510190286798848",
	integrations: [
		// Add the Vercel AI SDK integration to sentry.server.config.ts
		Sentry.vercelAIIntegration({
			recordInputs: true,
			recordOutputs: true,
		}),
		// send console.log, console.warn, and console.error calls as logs to Sentry
		Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
	],

	// Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
	tracesSampleRate: 1,

	// Enable logs to be sent to Sentry
	enableLogs: true,

	// Enable sending user PII (Personally Identifiable Information)
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
	sendDefaultPii: true,
});

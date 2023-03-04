import { z } from "zod";

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `PLASMO_PUBLIC_`.
 */
const schema = z.object({
  PLASMO_PUBLIC_WEB_URL: z.string().url(),
});

/**
 * You can't destruct `process.env` as a regular object, so we need to destruct it manually.
 */
const processEnv: Record<keyof z.infer<typeof schema>, string | undefined> = {
  PLASMO_PUBLIC_WEB_URL: process.env.PLASMO_PUBLIC_WEB_URL,
};

export const env = (() => {
  const parsed = schema.safeParse(processEnv);

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
})();

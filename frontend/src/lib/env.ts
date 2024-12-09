import { z } from "zod";

const envSchema = z.object({
  VITE_BASE_URL: z.string().url(),
});

const env = envSchema.parse(import.meta.env);

export default env;

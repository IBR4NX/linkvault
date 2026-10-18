import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { GOOGLE_CLIENT, SITE_URL } from "../constants";
import { admin } from "better-auth/plugins";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google:GOOGLE_CLIENT
  },
  trustedOrigins: [SITE_URL],
plugins:[
  admin(),
]});

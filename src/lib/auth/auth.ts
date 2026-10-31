import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { GOOGLE_CLIENT, SITE_URL } from "../constants";
import { admin, emailOTP } from "better-auth/plugins";
import { createVerificationEmail, sendEmail } from "./email";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: GOOGLE_CLIENT,
  },
  trustedOrigins: ["http://localhost:3000", "http://192.168.100.102:3000", SITE_URL],
  plugins: [
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        await sendEmail({
          to: email,
          subject: `${otp} is your ibovs.com verification code`,
          text: `
ibovs | Email Verification

مرحبًا،

شكرًا لانضمامك إلى ibovs.

رمز التحقق الخاص بك هو:

${otp}

أدخل هذا الرمز في صفحة التحقق لإكمال إنشاء حسابك.

تنتهي صلاحية الرمز خلال 5 دقائق.

لا تشارك رمز التحقق مع أي شخص.

إذا لم تطلب إنشاء حساب، يمكنك تجاهل هذه الرسالة.

© 2026 ibovs
  `.trim(),
        });
      },
    }),
  ],
});

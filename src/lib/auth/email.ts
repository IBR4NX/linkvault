import nodemailer from "nodemailer";
import { SMTP } from "../constants";

const transporter = nodemailer.createTransport({...SMTP});

export async function sendEmail({ to, subject, text, html }: { to: string; subject: string; text: string; html?: string }) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
}


interface VerificationEmailProps {
  otp: string;
  expiresInMinutes?: number;
}

export function createVerificationEmail({ otp, expiresInMinutes = 5 }: VerificationEmailProps) {
  const subject = `${otp} هو رمز التحقق الخاص بك | LinkVault`;

  const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>التحقق من البريد الإلكتروني</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Arial,Tahoma,sans-serif;color:#18181b;">

  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    رمز التحقق الخاص بك هو ${otp}. أدخل الرمز لتأكيد بريدك الإلكتروني.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f5f7;padding:40px 16px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:480px;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;">

          <tr>
            <td align="center" style="padding:32px 24px 24px;">

              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" valign="middle" width="42" height="42" style="width:42px;height:42px;background-color:#18181b;border-radius:12px;color:#ffffff;font-size:22px;font-weight:bold;">
                    L
                  </td>
                  <td style="padding-right:10px;font-size:23px;font-weight:700;letter-spacing:-0.5px;color:#18181b;" dir="ltr">
                    LinkVault
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="padding:0 32px;">

              <div style="height:1px;background-color:#e4e4e7;"></div>

            </td>
          </tr>

          <tr>
            <td align="center" style="padding:32px 28px 12px;">

              <div style="width:64px;height:64px;line-height:64px;background-color:#f4f4f5;border-radius:50%;font-size:28px;text-align:center;">
                &#9993;
              </div>

              <h1 style="margin:24px 0 12px;font-size:25px;line-height:1.6;font-weight:700;color:#18181b;">
                تأكيد بريدك الإلكتروني
              </h1>

              <p style="margin:0;font-size:15px;line-height:2;color:#52525b;">
                يسعدنا انضمامك إلى LinkVault.<br />
                استخدم رمز التحقق التالي لتأكيد بريدك الإلكتروني وإكمال إنشاء حسابك.
              </p>

            </td>
          </tr>

          <tr>
            <td align="center" style="padding:24px 28px 12px;">

              <p style="margin:0 0 14px;font-size:13px;color:#71717a;">
                رمز التحقق الخاص بك
              </p>

              <div dir="ltr" style="display:inline-block;padding:18px 28px;background-color:#f4f4f5;border:1px solid #e4e4e7;border-radius:12px;font-family:Arial,sans-serif;font-size:34px;font-weight:700;letter-spacing:10px;color:#18181b;">
                ${otp}
              </div>

              <p style="margin:18px 0 0;font-size:13px;line-height:1.8;color:#71717a;">
                تنتهي صلاحية الرمز خلال ${expiresInMinutes} دقائق.
              </p>

            </td>
          </tr>

          <tr>
            <td style="padding:24px 28px 32px;">

              <div style="padding:16px;background-color:#fafafa;border:1px solid #e4e4e7;border-radius:10px;">

                <p style="margin:0;font-size:13px;line-height:1.9;color:#52525b;">
                  <strong style="color:#18181b;">ملاحظة أمنية:</strong>
                  لا تشارك هذا الرمز مع أي شخص. لن يطلب منك فريق LinkVault رمز التحقق عبر الرسائل أو المكالمات.
                </p>

              </div>

              <p style="margin:24px 0 0;text-align:center;font-size:13px;line-height:1.9;color:#71717a;">
                إذا لم تطلب إنشاء حساب، يمكنك تجاهل هذه الرسالة بأمان.
              </p>

            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 24px;background-color:#fafafa;border-top:1px solid #e4e4e7;">

              <p style="margin:0;font-size:12px;color:#a1a1aa;">
                © ${new Date().getFullYear()} LinkVault. جميع الحقوق محفوظة.
              </p>

              <p style="margin:8px 0 0;font-size:12px;color:#a1a1aa;">
                رسالة آلية، يرجى عدم الرد عليها.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;

  const text = `
LinkVault
تأكيد بريدك الإلكتروني

رمز التحقق الخاص بك: ${otp}

تنتهي صلاحية الرمز خلال ${expiresInMinutes} دقائق.

لا تشارك هذا الرمز مع أي شخص.

إذا لم تطلب إنشاء حساب، يمكنك تجاهل هذه الرسالة.

© ${new Date().getFullYear()} LinkVault
`;

  return { subject, html, text };
}


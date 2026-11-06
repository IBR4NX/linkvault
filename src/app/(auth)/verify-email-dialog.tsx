"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";

import { authClient } from "@/lib/auth/auth-client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface VerifyEmailDialogProps {
  open: boolean;
  email: string;
  onOpenChange: (open: boolean) => void;
}

export function VerifyEmailDialog({ open, email, onOpenChange }: VerifyEmailDialogProps) {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!open || countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [open, countdown]);

  async function handleVerify() {
    if (otp.length !== 6 || loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      if (error) {
        setError(error.message ?? "رمز التحقق غير صحيح أو انتهت صلاحيته.");
        return;
      }

      setSuccess("تم التحقق من بريدك الإلكتروني بنجاح.");

      onOpenChange(false);
      //   router.refresh();
    } catch {
      setError("حدث خطأ أثناء التحقق. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (sending || countdown > 0) return;

    setSending(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });

      if (error) {
        setError(error.message ?? "تعذر إرسال رمز التحقق.");
        return;
      }

      setOtp("");
      setCountdown(60);
      setSuccess("تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني.");
    } catch {
      setError("تعذر إرسال الرمز. حاول مرة أخرى.");
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (loading || sending) return;

        onOpenChange(nextOpen);

        if (!nextOpen) {
          setOtp("");
          setError("");
          setSuccess("");
        }
      }}
    >
      <DialogOverlay>
        
        <DialogContent className="w-sm sm:max-w-106.25 " dir="rtl">
          <DialogHeader className="items-center text-center">
            <div className="mb-2 flex size-14 items-center justify-center rounded-full bg-primary/10">
              <Mail className="size-7 text-primary" />
            </div>

            <DialogTitle className="text-xl">تحقق من بريدك الإلكتروني</DialogTitle>

            <DialogDescription className="break-al">
              أدخل رمز التحقق المكوّن من 6 أرقام الذي أرسلناه إلى:
              <span className="font-medium text-foreground px-1" dir="ltr">
                {email}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="flex justify-center" dir="ltr">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                disabled={loading}
                autoComplete="one-time-code"
                inputMode="numeric"
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <p role="alert" className="text-center text-sm text-destructive">
                {error}
              </p>
            )}

            {success && (
              <p role="status" className="text-center text-sm text-green-600">
                {success}
              </p>
            )}

            <Button className="w-full" onClick={handleVerify} disabled={loading || otp.length !== 6}>
              {loading && <Loader2 className="ml-2 size-4 animate-spin" />}
              {loading ? "جارٍ التحقق..." : "تأكيد البريد الإلكتروني"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              لم يصلك الرمز؟
              <Button
                type="button"
                variant="link"
                className="px-2  border-0"
                onClick={handleResend}
                disabled={sending || countdown > 0}
              >
                {sending ? (
                  <>
                    <Loader2 className="ml-1 size-3 animate-spin" />
                    جارٍ الإرسال...
                  </>
                ) : countdown > 0 ? (
                  `إعادة الإرسال بعد ${countdown} ثانية`
                ) : (
                  "إعادة إرسال الرمز"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

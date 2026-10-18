# LinkVault

تطبيق Link Manager جاهز للتثبيت باستخدام **Next.js + TypeScript + PostgreSQL + Prisma + Better Auth**.

## الوظائف

- صفحة هبوط مستقلة.
- تسجيل حساب وتسجيل الدخول والخروج.
- جلسات Better Auth محفوظة في PostgreSQL.
- روابط خاصة لكل مستخدم.
- إنشاء، عرض، تعديل، حذف الروابط.
- استخراج اسم تلقائي من الرابط عند عدم إدخال عنوان.
- تطبيع URL وإزالة hash قبل التخزين.
- نسخ الرابط.
- فتح الرابط في نفس التبويب أو تبويب جديد.
- ترتيب أحدث الروابط أولًا.
- الوضع الفاتح والداكن مع مفتاح يدوي.
- حماية ملكية الرابط على الخادم في كل عمليات CRUD.

## المتطلبات

- Node.js 20 أو أحدث.
- pnpm 11 أو أحدث.
- PostgreSQL 14 أو أحدث.

## التثبيت

أنشئ قاعدة PostgreSQL باسم `linkvault`، ثم نفّذ:

```bash
pnpm install
cp .env.example .env
```

افتح `.env` وضع بياناتك المحلية:

```env
DATABASE_URL="postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/linkvault"
BETTER_AUTH_SECRET="ضع-هنا-سرًا-عشوائيًا-طويلًا"
BETTER_AUTH_URL="http://localhost:3000"
```

ثم نفّذ التهيئة:

```bash
pnpm db:generate
pnpm db:migrate
pnpm dev
```

افتح `http://localhost:3000`.

## أوامر المشروع

```bash
pnpm dev          # تشغيل التطوير
pnpm build        # بناء الإنتاج
pnpm start        # تشغيل نسخة الإنتاج
pnpm lint         # فحص ESLint
pnpm typecheck    # فحص TypeScript
pnpm db:generate  # توليد Prisma Client
pnpm db:migrate   # إنشاء/تطبيق migration محلي
pnpm db:push      # دفع المخطط مباشرة بدون migration
```

## الهيكل

```text
src/app/
  page.tsx                    صفحة الهبوط/التوجيه
  login/page.tsx              تسجيل الدخول
  register/page.tsx           إنشاء الحساب
  dashboard/page.tsx          لوحة التحكم المحمية
  auth-form.tsx               نموذج Better Auth القابل لإعادة الاستخدام
  link-manager.tsx            واجهة CRUD للروابط
  theme-toggle.tsx            تبديل الثيم
  api/auth/[...all]/route.ts  مسارات Better Auth
  api/links/route.ts          إنشاء وقراءة الروابط
  api/links/[id]/route.ts     تعديل وحذف الروابط

src/lib/
  auth.ts                     إعداد Better Auth
  auth-client.ts              عميل المصادقة للمتصفح
  auth-session.ts             جلب الجلسة على الخادم
  prisma.ts                   عميل Prisma واحد قابل لإعادة الاستخدام
  link-validation.ts          تحقق مدخلات الروابط
  link-metadata.ts            تطبيع الرابط واستخراج الاسم

prisma/
  schema.prisma               User, Session, Account, Verification, Link
```

## الأمان

- لا يتم قبول `userId` من العميل.
- يتم اشتقاق المالك من جلسة Better Auth على الخادم.
- كل استعلام روابط يحتوي على `userId` الخاص بالمستخدم الحالي.
- الحذف والتعديل يستخدمان شرط الملكية داخل Prisma.
- لا يوجد اعتماد على `localStorage` لتخزين الروابط.
- لا يتم تنفيذ جلب HTML من روابط المستخدم تلقائيًا لتجنب مخاطر SSRF؛ استخراج الاسم الحالي آمن ومحلي وقابل للاستبدال لاحقًا بخدمة metadata معزولة.
- لا تضع كلمات المرور أو `BETTER_AUTH_SECRET` داخل Git.

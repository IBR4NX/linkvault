/**
 * أدوات لتحويل أي كائن إلى قوائم حقول جاهزة للعرض أو التعديل
 * (مثلاً: صفحات التفاصيل، نماذج التعديل، الجداول).
 */

export type Labels = Readonly<Record<string, string>>;

export interface FieldEntry<K extends string = string, V = string|number|unknown> {
  key: K;
  name: string;
  value: V;
}
export function pickFields<T extends object, K extends keyof T & string>(
  source: T,
  fields: readonly (K | Partial<Labels>)[],
): FieldEntry<K, T[K]>[] {
  return fields.flatMap((field) => {
    const entries = typeof field === "string" ? [[field, field] as const] : Object.entries(field);

    return entries
      .filter(([key]) => key in source)
      .map(([key, label]) => ({
        key: key as K,
        name: label as string,
        value: source[key as K],
      }));
  });
}
/**
 * يختار الحقول المطلوبة من الكائن بالترتيب المحدد في `keys`
 * ويتجاهل أي مفتاح غير موجود في الكائن.
 */
export function pickFieldsLabels<T extends object, K extends keyof T & string>(
  source: T,
  keys: readonly K[],
  labels: Labels = {},
): FieldEntry<K, T[K]>[] {
  console.log(
    "kf: ",
    keys.filter((key) => key in source),
  );
  return keys
    .filter((key) => key in source)
    .map((key) => ({
      key,
      name: labels[key] ?? key,
      value: source[key],
    }));
}

export interface ConverterConfig<G extends string, K extends string = string> {
  /** مجموعات الحقول: اسم المجموعة -> المفاتيح المطلوبة */
  groups: Readonly<Record<G, readonly K[]>>;
  labels?: Labels;
  returnSourse?: boolean;
}

export type Converted<T, G extends string> = T & Record<G, FieldEntry[]>;
export type status = { ok: Readonly<boolean> };

/**
 * ينشئ دالة تحويل قابلة لإعادة الاستخدام لأي كيان.
 *
 * @example
 * const convertLink = createConverter({
 *   groups: { info: ["title", "url"], edit: ["title"] },
 *   labels: { title: "العنوان", url: "الرابط" },
 * });
 * const result = convertLink(link); // { ...link, info: [...], edit: [...] }
 */
export function createConverter<G extends string>({ groups, labels = {}, returnSourse = false }: ConverterConfig<G>) {
  const groupNames = Object.keys(groups) as G[];
  console.log("g", groupNames);
  return function convert<T extends object>(source: T | null | undefined): Converted<T & status, G> | status {
    if (!source)   throw new Error( "ok: false" );

    const record = source as Record<string, unknown>;
    const result = {} as Record<G, FieldEntry[]>;
    for (const group of groupNames) {
      result[group] = pickFieldsLabels(record, groups[group], labels);
    }
    if (returnSourse) return { source, ...result, ok: true };
    return { ...result, ok: true };
  };
}

export type GroupNames = {
	source?: object;
	displayHeader?: FieldEntry[];
	displayFields: FieldEntry[];
	editableFields: FieldEntry[];
	editableFields2?: FieldEntry[];
};
/** تحويل بيانات المستخدم: `data` للعرض و `edit` للحقول القابلة للتعديل */
export const convertUser = createConverter({
  groups: {
    displayFields: ["name", "email",  "role", "emailVerified"],
    editableFields: ["name", "email"],
    displayHeader: ["image","name", "email"],
  },
    labels: { name: "الاسم", email: "البريد", createdAt: "تاريخ الانشاء", updatedAt: "اخر تحديث" },
})

export default convertUser;

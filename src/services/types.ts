import { FieldEntry } from "./convertData";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type FormItem = {
  key: string | number;
  name: string;
  value?: string | number | null;
};

export type TFieldEntry = FieldEntry[];

"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import type { Method, TFieldEntry } from "@/services/types";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useAlertApi } from "@/services/AlertProvider";
import { authClient } from "@/lib/auth/auth-client";

export interface FormProps {
  fields: TFieldEntry;
  url?: string;
  method?: Method;
  Submit: (form: Record<string, string>) => void;
}

export default function Form({ fields, url, method="PUT", Submit }: FormProps) {
  const [form, setForm] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("#----- ");

    Submit(form);
  };

  return (
    <>
      <form id="Form" name="Form" onSubmit={handleSubmit}>
        <div className="-mx-4 gap-4 flex flex-col py-4 no-scrollbar min-h-[30vh] max-h-[50vh] overflow-y-auto px-4">
          {fields.map((field) => (
            <InputGroup key={String(field.key)}>
              <InputGroupInput
                id={String(field.key)}
                name={String(field.key)}
                onChange={handleChange}
                defaultValue={typeof field.value == "string" ? field.value : ""}
              />
              <InputGroupAddon className="px-2">{field.name}</InputGroupAddon>
            </InputGroup>
          ))}
        </div>
      </form>
    </>
  );
}

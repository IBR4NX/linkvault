import { z } from "zod";
import { extractLinkTitle, normalizeUrl } from "@/lib/link-metadata";

export const linkInputSchema = z.object({
  url: z.string().trim().url("Enter a valid URL.").refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }, "Only HTTP and HTTPS links are supported."),
  title: z.string().trim().min(1).max(200).optional(),
});

export { extractLinkTitle, normalizeUrl };

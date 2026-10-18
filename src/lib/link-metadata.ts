export function normalizeUrl(value: string) {
  const url = new URL(value.trim());
  url.hash = "";
  return url.toString();
}

/**
 * Safe baseline metadata extraction. It avoids server-side fetching of arbitrary
 * URLs (SSRF risk) and can be replaced later by a dedicated metadata worker.
 */
export function extractLinkTitle(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    const pathName = decodeURIComponent(url.pathname).split("/").filter(Boolean).pop();
    if (pathName && pathName !== host) {
      return pathName.replace(/[-_]+/g, " ").replace(/\.[a-z0-9]{2,5}$/i, "").trim() || host;
    }
    return host;
  } catch {
    return "Saved link";
  }
}

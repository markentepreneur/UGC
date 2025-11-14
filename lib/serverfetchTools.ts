import { headers } from "next/headers";
import { fetchRequest } from "./fetchTools";

/**
 * Get the Cookie header from Next.js server-side headers.
 *
 * @returns {string | undefined} The value of the Cookie header, or undefined if not present.
 */
export async function getCookieHeaderFromNext(): Promise<
  Record<string, string>
> {
  const headersList = await headers();
  const cookie = headersList.get("cookie");
  return {
    "Content-Type": "application/json",
    ...(cookie ? { Cookie: cookie } : {}),
  };
}

/**
 * Like fetchRequest, but ensures cookies are included from the Next.js server context if not present in config.
 */
export const fetchRequestFromServer: typeof fetchRequest = async (
  fetchUrl,
  method,
  body,
  config,
  saveEmpties
) => {
  let finalConfig = config;

  // If the config is absent or does not include Cookie, add server cookie header
  const needsCookie =
    !finalConfig ||
    (finalConfig instanceof Headers && !finalConfig.has("Cookie")) ||
    (typeof finalConfig === "object" &&
      finalConfig !== null &&
      !Object.keys(finalConfig).some((k) => k.toLowerCase() === "cookie"));

  if (needsCookie) {
    const cookieHeader = await getCookieHeaderFromNext();
    if (!finalConfig) {
      finalConfig = cookieHeader;
    } else if (finalConfig instanceof Headers) {
      if (cookieHeader.Cookie) {
        finalConfig.set("Cookie", cookieHeader.Cookie);
      }
    } else {
      if (cookieHeader.Cookie) {
        (finalConfig as Record<string, string>)["Cookie"] = cookieHeader.Cookie;
      }
    }
  }

  return await fetchRequest(fetchUrl, method, body, finalConfig, saveEmpties);
};

import { FormError } from "@/types/FormError";
import { IFetchError } from "@/types/IFetchError";

type FetchMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetchRequest = async <Res, Body extends object = object>(
  fetchUrl: string,
  method: FetchMethods = "GET",
  body: Body | null = null,
  config?: HeadersInit,
  saveEmpties?: boolean
) => {
  const filteredBody: Partial<Body> = {};
  const isFormData = body instanceof FormData;
  const isNeededFilter = !!(!isFormData && !saveEmpties);
  if (body && isNeededFilter) {
    for (const key in body) {
      if (body[key]) {
        filteredBody[key] = body[key];
      }
    }
  }

  // If fetchUrl does not include 'http', prepend process.env.NEXT_PUBLIC_BASE_URL
  let finalFetchUrl = fetchUrl;
  if (typeof fetchUrl === "string" && !/^https?:\/\//i.test(fetchUrl)) {
    if (typeof process.env.NEXT_PUBLIC_BASE_URL === "string") {
      // Ensure exactly one slash between base url and path
      const base = process.env.NEXT_PUBLIC_BASE_URL.replace(/\/+$/, "");
      const path = fetchUrl.replace(/^\/+/, "");
      finalFetchUrl = `${base}/${path}`;
    } else {
      throw new Error(
        "NEXT_PUBLIC_BASE_URL is not defined in environment variables"
      );
    }
  }

  const reqHeaders: HeadersInit = {
    ...(config || {}),
  };

  // Automatically set Content-Type if not FormData and not already set:
  // To support HeadersInit as type, we need to handle both Record and Headers objects
  const lowerCasedContentTypeExists = (headers: HeadersInit) => {
    if (headers instanceof Headers) {
      return headers.has("Content-Type");
    } else if (typeof headers === "object" && headers !== null) {
      // For Record<string, string>
      return Object.keys(headers).some(
        (k) => k.toLowerCase() === "content-type"
      );
    }
    return false;
  };

  if (!isFormData && !lowerCasedContentTypeExists(reqHeaders)) {
    if (reqHeaders instanceof Headers) {
      reqHeaders.set("Content-Type", "application/json");
    } else if (typeof reqHeaders === "object" && reqHeaders !== null) {
      (reqHeaders as Record<string, string>)["Content-Type"] =
        "application/json";
    }
  }

  // Always include credentials to send cookies/session in requests (browser only has effect)

  const response = await fetch(finalFetchUrl, {
    method: method,
    body:
      !body || isFormData
        ? body
        : JSON.stringify(!saveEmpties ? filteredBody : body),
    headers: reqHeaders,
    credentials: "include",
  });

  if (response.status === 204) {
    return response as Res;
  }

  const resData: Res = await response.json();

  if (!response.ok) {
    throw { message: resData, status: response.status };
  }
  return resData;
};

export const createFormData = <T extends object>(
  data: T,
  saveEmpties?: boolean
) => {
  const formData = new FormData();

  for (const key in data) {
    const item = data[key as keyof T];
    if (!saveEmpties && !item && item !== 0) continue;
    if (Array.isArray(item)) {
      for (let i = 0; i < item.length; i++) {
        formData.append(`${key}[]`, item[i]);
      }
    } else {
      formData.append(key, item as string);
    }
  }

  return formData;
};

export const setFormError = <T extends object>(error: IFetchError<T>) => {
  let payload: FormError<T> = {};
  if (error?.message?.errors) {
    payload = error?.message?.errors;
  }
  return payload;
};

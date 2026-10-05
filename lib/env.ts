/** Only NEXT_PUBLIC_* values are read; nothing secret belongs here. */
export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL ?? "";
export const isApiConfigured: boolean = API_BASE_URL.length > 0;

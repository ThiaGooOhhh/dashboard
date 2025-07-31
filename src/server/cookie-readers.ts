import { cookies } from "next/headers";

export function getValueFromCookie(key: string): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get(key)?.value;
}

export function getPreference<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  const cookieStore = cookies();
  const cookie = cookieStore.get(key);
  const value = cookie ? cookie.value.trim() : undefined;
  return allowed.includes(value as T) ? (value as T) : fallback;
}
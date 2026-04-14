import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const isSanityConfigured = Boolean(projectId);

export const client = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: "2024-12-01",
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;

/**
 * Safe fetch — returns null when Sanity is not configured or on error.
 * Returns null for empty arrays so fallback demo data can be used.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options?: { next?: { revalidate?: number } }
): Promise<T | null> {
  if (!client) return null;
  try {
    const result = await client.fetch<T>(query, params, options);
    if (Array.isArray(result) && result.length === 0) return null;
    return result;
  } catch {
    return null;
  }
}

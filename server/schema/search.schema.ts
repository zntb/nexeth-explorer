import { z } from "zod";

export const searchItemSchema = z.object({
  title: z.string(),
  type: z.string(),
  href: z.string(),
  external: z.boolean().optional(),
  chain: z.string().optional(),
});
export type SearchItem = z.infer<typeof searchItemSchema>;

export const searchRequestSchema = z.object({
  query: z.string(),
});
export type SearchRequest = z.infer<typeof searchRequestSchema>;

export const searchResponseSchema = z.object({
  results: z.array(searchItemSchema),
});

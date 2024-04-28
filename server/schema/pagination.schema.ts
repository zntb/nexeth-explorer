import { z } from "zod";

export const paginationRequestSchema = z.object({
  limit: z.number().optional().default(10),
  page: z.number().optional().default(0),
  search: z.string().optional().default(""),
});
export type PaginationRequest = z.infer<typeof paginationRequestSchema>;
export const paginationResponseSchema = z.object({
  hasNextPage: z.boolean().optional(),
});
export type PaginationResponse = z.infer<typeof paginationResponseSchema>;

export type SortDirection = "asc" | "desc";
export const sortSchema = z.object({
  field: z.string(),
  direction: z.union([z.literal("asc"), z.literal("desc")]),
});
export type SortOption = z.infer<typeof sortSchema>;

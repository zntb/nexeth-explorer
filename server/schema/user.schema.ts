import { z } from "zod";

import { addressSchema } from "./address.schema";

export const userSchema = z.object({
  address: addressSchema,
  username: z.string(),
});
export type User = z.infer<typeof userSchema>;

export const getSessionResponseSchema = z.object({
  address: addressSchema.optional(),
  user: userSchema.optional(),
});
export type GetSessionResponse = z.infer<typeof getSessionResponseSchema>;

export const updateUserRequestSchema = z.object({
  username: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters")
    .regex(/^[\w]+$/, "Only letters, numbers, underscores"),
});
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export const updateUserResponseSchema = z.object({
  user: userSchema,
});
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;

export const usernameExistsRequestSchema = z.object({
  username: z.string().optional(),
});
export type UsernameExistsRequest = z.infer<typeof usernameExistsRequestSchema>;
export const usernameExistsResponseSchema = z.object({
  exists: z.boolean(),
  currentUser: z.boolean(),
});
export type UsernameExistsResponse = z.infer<
  typeof usernameExistsResponseSchema
>;

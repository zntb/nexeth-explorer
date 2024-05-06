import { getAddress } from "thirdweb";
import { z } from "zod";

export const addressSchema = z.string().refine(getAddress);
export type Address = z.infer<typeof addressSchema>;

export const getChainAddressRequestSchema = z.object({
  chain: z.string(),
  address: addressSchema,
});
export type GetChainAddressRequest = z.infer<
  typeof getChainAddressRequestSchema
>;

export const getAddressRequestSchema = z.object({
  address: addressSchema,
});
export type GetAddressRequest = z.infer<typeof getAddressRequestSchema>;

export const getAddressDetailsResponseSchema = z.object({
  balance: z.string(),
  isContract: z.boolean(),
});
export type GetAddressDetailsResponse = z.infer<
  typeof getAddressDetailsResponseSchema
>;

export const matchingAddresses = (
  addressOne?: string,
  addressTwo?: string
): boolean =>
  !!addressOne &&
  !!addressTwo &&
  getAddress(addressOne) === getAddress(addressTwo);

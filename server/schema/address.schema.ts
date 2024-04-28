import { getAddress } from "thirdweb";
import { z } from "zod";

export const addressSchema = z.string().refine(getAddress);
export type Address = z.infer<typeof addressSchema>;

export const matchingAddresses = (
  addressOne?: string,
  addressTwo?: string
): boolean =>
  !!addressOne &&
  !!addressTwo &&
  getAddress(addressOne) === getAddress(addressTwo);

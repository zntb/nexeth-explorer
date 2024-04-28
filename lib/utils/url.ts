import { VERCEL_URL } from "../constants";

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";

  return VERCEL_URL ? `https://${VERCEL_URL}` : "http://localhost:3000";
};

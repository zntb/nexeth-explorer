export const isIpfsSearch = (value: string): boolean =>
  value.startsWith("ipfs://") ||
  value.startsWith("Qm") ||
  value.startsWith("baf");

export const getIpfsHash = (value: string): string =>
  value.replace("ipfs://", "");

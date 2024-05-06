export const isIpfsSearch = (value: string): boolean =>
  value.startsWith("ipfs://") ||
  value.startsWith("Qm") ||
  value.startsWith("baf");

export const getIpfsHash = (value: string): string =>
  value.replace("ipfs://", "");

export const getIpfsCidVersion = (value: string): string => {
  if (value.startsWith("Qm")) {
    return "v0";
  }

  if (value.startsWith("baf")) {
    return "v1";
  }

  return "unknown";
};

import { useColorMode } from "../hooks";

export const nexethBannerTransparentLight =
  "/logos/nexeth-banner-transparent-light.png";
export const nexethBannerTransparentDark =
  "/logos/nexeth-banner-transparent-dark.png";

export const nexethBannerLight = "/logos/nexeth-banner-light.jpeg";
export const nexethBannerDark = "/logos/nexeth-banner-dark.jpeg";

export const nexethLogoLight = "/logos/nexeth-logo-transparent-light.png";
export const nexethLogoDark = "/logos/nexeth-logo-transparent-dark.png";

export const nexethLogoTransparent = "/logos/nexeth-logo-transparent.png";

export const useNexethLogo = () => {
  const { isLight } = useColorMode();
  return isLight ? nexethLogoLight : nexethLogoDark;
};

export const useNexethBanner = () => {
  const { isLight } = useColorMode();
  return isLight ? nexethBannerLight : nexethBannerDark;
};

export const useNexethBannerTransparent = () => {
  const { isLight } = useColorMode();

  return isLight ? nexethBannerTransparentLight : nexethBannerTransparentDark;
};

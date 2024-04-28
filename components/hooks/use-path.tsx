import { useRouter } from "next/router";
import { useMemo } from "react";

export const usePath = () => {
  const router = useRouter();

  const path = router.asPath;
  const basePath = path.split("/")[1] || "";
  const breadcrumbs = useMemo(() => {
    if (router.isFallback) return [];
    return router.asPath
      .split("/")
      .filter(Boolean)
      .map((segment) => segment.split("?")[0]);
  }, [router]);

  return { basePath, path, breadcrumbs };
};

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useQueryParams } from "./use-query-params";

export const useQueryStoreSync = <T extends any>(
  key: string,
  get: T,
  set: ((val: T) => void) | ((val: string) => void)
) => {
  const { isReady } = useRouter();
  const [isFetched, setIsFetched] = useState(false);
  const { [key]: value } = useQueryParams([key]);

  const getSearchUrl = () =>
    new URLSearchParams(window.location.search.slice(1));

  useEffect(() => {
    if (!isReady || isFetched || !value || value === "[]") return;
    setIsFetched(true);
    try {
      set(JSON.parse(value));
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("Failed to parse query params for", key, "given", value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only call once when router is ready
  }, [isReady]);

  useEffect(() => {
    if (!isReady || get === undefined) return;
    const searchParams = getSearchUrl();
    searchParams.set(key, JSON.stringify(get));
    window.history.replaceState(
      null,
      null as any,
      `?${searchParams.toString()}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only call once when get value changes
  }, [get]);
};

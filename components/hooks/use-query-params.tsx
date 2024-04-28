import { useRouter } from "next/router";

export const useQueryParams = (params: string[]): Record<string, string> => {
  const { query } = useRouter();

  return params.reduce((acc, param) => {
    const value = query[param];

    return {
      ...acc,
      [param]: value,
    };
  }, {});
};

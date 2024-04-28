import { trpc } from "@/server";

export const useUsernameExists = (username: string, enabled = true) => {
  const { data, isLoading, ...response } = trpc.user.usernameExists.useQuery(
    { username },
    { keepPreviousData: false, enabled }
  );

  return {
    exists: data?.exists,
    currentUser: data?.currentUser,
    allowUpdate: (!!username && !data?.exists) || data?.currentUser,
    isLoadingUsername: isLoading,
    ...response,
  };
};

import { useAddress, useUser } from "@thirdweb-dev/react";
import { useMemo } from "react";

import { trpc } from "@/server";

export const useSession = () => {
  const address = useAddress();
  const { isLoggedIn, isLoading: isLoadingUser } = useUser();

  const {
    data,
    isLoading: isLoadingSession,
    ...response
  } = trpc.user.getSession.useQuery(undefined, {
    enabled: !!address && isLoggedIn,
  });
  const isLoading = isLoadingSession || isLoadingUser;
  const isConnected =
    !!address && isLoggedIn && !!data?.address && data.address === address;
  const isSignedUp = useMemo(
    () =>
      data?.user?.username.toLowerCase() !== data?.user?.address.toLowerCase(),
    [data?.user?.address, data?.user?.username]
  );

  return {
    address: data?.address,
    user: data?.user,
    isConnected,
    isSignedUp,
    isLoading,
    isLoadingUser,
    ...response,
  };
};

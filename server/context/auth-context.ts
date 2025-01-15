import * as trpcNext from '@trpc/server/adapters/next';
import { getAddress } from 'thirdweb/utils';

import { connect } from '../database';
import { UserModel } from '../database/models';
import { User, userSchema } from '../schema';

import { thirdWebService } from '@/lib';

export type AuthSession = {
  address: string;
};

export type AuthContext = {
  session?: AuthSession;
  user?: User;
};

/**
 * Creates the Auth Context for the API. If the user is correctly authenticated, the auth will be included in the context
 * Also includes DB connection
 */
export const createAuthContext = async ({
  req,
}: trpcNext.CreateNextContextOptions): Promise<AuthContext> => {
  return {
    session: undefined,
  };

  await connect(); // TODO: see if we can find a way to only use this context on authenticated routes to prevent excessive DB connections

  const session = (await thirdWebService().getUser(req)) as AuthSession;
  if (!session || !session.address) {
    return {
      session: undefined,
    };
  }

  session.address = getAddress(session.address);

  let user = await UserModel.findOne({ address: session.address }).select(
    'address username avatar',
  );
  if (!user) {
    user = await UserModel.create({
      address: session.address,
      username: session.address,
      avatar: '',
    });
  }

  return {
    session,
    user: userSchema.parse(user),
  };
};

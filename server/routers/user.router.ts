import { AuthContext } from "../context";
import { UserModel } from "../database/models";
import { BadRequestError, NotFoundError } from "../errors";
import { router, protectedProcedure } from "../router-procedures";

import {
  getSessionResponseSchema,
  updateUserRequestSchema,
  updateUserResponseSchema,
  usernameExistsRequestSchema,
  usernameExistsResponseSchema,
} from "@/server";

export const userRouter = router({
  getSession: protectedProcedure
    .output(getSessionResponseSchema)
    .query(({ ctx }) => ({
      address: ctx.session?.address,
      user: ctx.user,
    })),

  editProfile: protectedProcedure
    .input(updateUserRequestSchema)
    .output(updateUserResponseSchema)
    .mutation(async ({ ctx, input }) => {
      const { exists, currentUser } = await usernameExists(ctx)(input.username);
      if (exists && !currentUser) {
        throw BadRequestError("Username already exists");
      }

      const user = await UserModel.findOneAndUpdate(
        { address: ctx?.user?.address },
        { username: input.username },
        { new: true }
      );
      if (!user) throw NotFoundError("User");

      return { user };
    }),

  usernameExists: protectedProcedure
    .input(usernameExistsRequestSchema)
    .output(usernameExistsResponseSchema)
    .query(async ({ input, ctx }) => usernameExists(ctx)(input.username)),
});

const usernameExists = (ctx: AuthContext) => async (username?: string) => {
  if (!username) return { exists: false, currentUser: false };
  if (ctx.user?.username.toLowerCase() === username.toLowerCase()) {
    return { exists: true, currentUser: true };
  }

  const user = await UserModel.findOne({
    // Case-insensitive search
    username: { $regex: new RegExp("^" + username + "$", "i") },
  });

  return { exists: !!user, currentUser: false };
};

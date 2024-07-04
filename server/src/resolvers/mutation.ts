import { GraphQLError } from "graphql";
import { prisma } from "../db";
import { MutationResolvers, User } from "../generated/graphql";

const Mutation: MutationResolvers = {
  updateUser: async (_, { user }) => {
    try {
      const nameExists = await prisma.user.findFirst({
        where: {
          NOT: {
            id: user.id,
          },
          displayName: user.displayName,
        },
      });
      if (nameExists) {
        throw new GraphQLError("Username already exists", {
          extensions: {
            code: "USERNAME_EXISTS",
          },
        });
      }
      const updatedUser = await prisma.user.upsert({
        where: { id: user.id },
        update: { displayName: user.displayName },
        create: { id: user.id, displayName: user.displayName },
        select: {
          id: true,
          displayName: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return {
        success: true,
        code: "200",
        message: "Username Updated",
        user: {
          id: updatedUser.id,
          displayName: updatedUser.displayName,
          createdAt: updatedUser.createdAt.toUTCString(),
          updatedAt: updatedUser.updatedAt.toUTCString(),
        },
      };
    } catch (err) {
      return {
        success: false,
        code: err.extensions.code as string,
        message: err.message as string,
        user: null,
      };
    }
  },
};

export default Mutation;

import { prisma } from "../db";
import { QueryResolvers } from "../generated/graphql";

const Query: QueryResolvers = {
  getUser: async (_, { id }) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      return {
        id: user.id,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt.toString(),
        username: user.username,
        passwordHash: user.passwordHash,
      };
    }
  },
};

export default Query;

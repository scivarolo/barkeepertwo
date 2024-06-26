import { prisma } from "../db";
import { MutationResolvers } from "../generated/graphql";

const Mutation: MutationResolvers = {
  updateUser: async (_, { user }) => {
    console.log(user);
    console.log("YO");
    const updatedUser = await prisma.user.upsert({
      where: { id: user.id },
      update: { displayName: user.displayName },
      create: { id: user.id, displayName: user.displayName },
    });
    return { id: updatedUser.id, displayName: updatedUser.displayName };
  },
};

export default Mutation;

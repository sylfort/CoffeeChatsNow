// import { z } from "zod";

import { clerkClient } from "@clerk/nextjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type User } from '@clerk/nextjs/dist/types/server';

const filterUserForClient = (user: User) => {

  return {
    id: user.id, 
    username: user.username, 
    imgUrl: user.imageUrl
  }
}

export const postsRouter = createTRPCRouter({

  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    const users = (await clerkClient.users.getUserList({
      userId: posts.map((posts) => posts.authorId),
      limit: 100,
    })
    ).map(filterUserForClient)

  return posts.map((post) => ({
    post,
    author: users.find((user) => user.id === post.authorId)
  }))
  }),
});


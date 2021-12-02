import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreatePost = z.object({
  name: z.string(),
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
  userId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreatePost),
  // resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const post = await db.post.create({ data: input })

    return post
  }
)

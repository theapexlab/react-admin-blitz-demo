import { Ctx, AuthenticationError } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, ctx: Ctx) {
  if (!ctx.session.userId) throw new AuthenticationError()

  const user = await db.user.findFirst({
    where: { id: ctx.session.userId },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}

import db from "db"

const seed = async () => {
  await db.post.deleteMany()
  await db.user.deleteMany()
  await Promise.all(
    [1, 2, 3, 4, 5].map((i) => {
      return db.user.create({
        data: {
          name: `name_${i}`,
          email: `test${i}@test.io`,
          posts: {
            createMany: {
              data: [
                {
                  title: `postTitle_${i + 1}`,
                  content: `postContent_${i + 1}`,
                },
                {
                  title: `postTitle_${i + 2}`,
                  content: `postContent_${i + 2}`,
                },
                {
                  title: `postTitle_${i + 3}`,
                  content: `postContent_${i + 3}`,
                },
                {
                  title: `postTitle_${i + 4}`,
                  content: `postContent_${i + 4}`,
                },
                {
                  title: `postTitle_${i + 5}`,
                  content: `postContent_${i + 5}`,
                },
              ],
            },
          },
        },
      })
    })
  )
}

export default seed

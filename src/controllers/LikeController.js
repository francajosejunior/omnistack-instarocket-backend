const db = require('./../config/db')

module.exports = {
  async store(req, res) {
    const id = req.params.id

    // const post = await Post.findById(id)
    // post.likes += 1
    // await post.save()

    const posts = db.getData('/posts/list')
    let post

    db.push(
      `/posts/list`,
      posts.map(p => {
        if (p._id === id) {
          post = p
          p.likes = p.likes + 1
        }
        return p
      })
    )

    req.io.emit('like', post)

    res.json(post)
  }
}

const Post = require('./../models/Post')

module.exports = {
  async store(req, res) {
    const id = req.params.id

    const post = await Post.findById(id)
    post.likes += 1

    await post.save()

    req.io.emit('like', post)

    res.json(post)
  }
}

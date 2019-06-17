const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const uniqid = require('uniqid')
const db = require('./../config/db')

module.exports = {
  async index(req, res) {
    // const posts = await Post.find().sort('-createdAt')
    const posts = db.getData('/posts/list')
    res.json(posts.reverse())
  },
  async store(req, res) {
    const { author, place, description, hashtags } = req.body
    const { filename } = req.file

    const [name] = filename.split('.')
    const image = `${name}.jpg`

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', image))

    fs.unlinkSync(req.file.path)

    // const post = await Post.create({
    //   author,
    //   place,
    //   description,
    //   hashtags,
    //   image
    // })

    const post = {
      _id: uniqid(),
      author,
      place,
      description,
      hashtags,
      image,
      likes: 0
    }

    db.push(`/posts/list[]`, post)

    req.io.emit('post', post)

    res.json(post)
  }
}

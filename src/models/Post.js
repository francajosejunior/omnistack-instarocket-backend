const mongosse = require('mongoose')

const PostShema = new mongosse.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongosse.model('Post', PostShema)

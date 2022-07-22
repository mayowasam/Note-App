const mongoose = require('mongoose')
const { model, Schema } = mongoose

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    title: {
        type: String,
        required:true

    },
    description: {
        type: String,
        required:true

    },
    date: {
        type: Date,
        required:true


    },
    completed: {
        type: Boolean
    }
}, {
    timestamps: true
})

module.exports = Post = model("post", postSchema)
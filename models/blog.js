const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const blogSchema = new mongoose.Schema({
    title: {
        desc: "Title of the blog.",
        trim: true,
        type: String,
        required: true
    },
    body: {
        desc: "Details of the blog.",
        trim: true,
        type: String,
        required: true
    },
    userId: {
        desc: "Id of the user who created the blog.",
        type: Number,
        required: true,
        default: 23
    },
    slug: {
        desc: "Stores SEO friendly urls.",
        trim: true,
        type: String,
        required: true,
        unique: true
    }
});

blogSchema.pre("validate", function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }
    next();
})

module.exports = mongoose.model("Blog", blogSchema);
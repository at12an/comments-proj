// IMPORTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const rateLimit = require('express-rate-limit');

// DB CONNECTION
const db_url  = process.env.DB_URL
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const commentSchema = new mongoose.Schema({
    comment: String,
    color: String,
    bgColor: String,
    x: Number,
    y: Number,
});

const Comment = mongoose.model('Comment', commentSchema);

// LIMIT REQUESTS
// const commentLimiter = rateLimit({
//     windowMs: 60 * 1000, 
//     max: 1, 
//     message: 'Too many comment requests. Please try again later.',
// });

// INFORMATION PARSING
app.use(bodyParser.json());



// ROUTING
const port = 12000;
app.listen(port, () => {
    console.log(port);
})

app.post('/', (req, res) => {
    console.log("Root")
});

app.post('/post-comment', (req, res) => {
    async function saveComment() {
        const comment = req.body.comment;
        const color = req.body.color;
        const bgColor = req.body.bgColor
        const x = Math.floor(Math.random() * (91 - 10) + 10);
        const y = Math.floor(Math.random() * (91 - 10) + 10);
        const newComment = new Comment({
            comment: comment,
            color: color,
            bgColor: bgColor,
            x: x,
            y: y,
        });
        try {
            await newComment.save()
            console.log("Added comment: " + comment + " in " + color + " successfully");
            res.status(200)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    saveComment();
});

app.get('/get-comments', (req, res) => {
    async function saveComment() {
        try {
            const comments = await Comment.find({});
            res.status(200).json({ comments });
            console.log('Fetched comments');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    saveComment()
})




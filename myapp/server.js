const express = require('express')

const app = express()
let comments = [1,2,3,4]
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.post('/post-comment', (req, res) => {
    const comment = req.body.comment;
    comments.push(comment);
    console.log(comments)
});

app.get('/get-comments', (req, res) => {
    res.json(comments)
})

const port = 3001

app.listen(port, () => {
    console.log(port)
})


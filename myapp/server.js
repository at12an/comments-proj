const express = require('express')

const app = express()
let comments = [{comment:'old comment1', color:'#000000'}, {comment:'Oldcomment2~', color:'red'}]
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.post('/post-comment', (req, res) => {
    const comment = req.body.comment;
    const color = req.body.color;
    comments.push({comment:comment, color:color});
    console.log(comments)
});

app.get('/get-comments', (req, res) => {
    res.json(comments)
})

const port = 3001;

app.listen(port, () => {
    console.log(port)
})


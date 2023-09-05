const express = require('express');
const fs = require('fs').promises;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const data = {comments:[]}

const port = 12000;

app.listen(port, () => {
    console.log(port);
})
app.post('/', (req, res) => {
    console.log("Root")
});

app.post('/post-comment', (req, res) => {
    const comment = req.body.comment;
    const color = req.body.color;
    const x = Math.floor(Math.random() * (91 - 10) + 10);
    const y = Math.floor(Math.random() * (91 - 10) + 10);
    data.comments.push({comment:comment,color:color,x:x, y:y})
    console.log("Added comment: " + comment + " in " + color + " successfully")
    res.status(200);
});

app.get('/get-comments', (req, res) => {
    res.json(data)
    res.status(200);
    console.log("Fetched comments")
})


async function getComments() {
   try {
        const data = await fs.readFile('data.json');
        const jsonData = JSON.parse(data);
        return jsonData.comments;
    } catch (err) {
        console.error('Error reading data:', err);
        throw err;
    }
}

async function addComment(comment, color) {
    try {
        const comments = await getComments();
        const append = { comment: comment, color: color };
        comments.push(append);
        const jsonData = { comments: comments };
        await fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8');
    } catch (err) {
        console.error('Error writing data:', err);
        throw err;
    }
}


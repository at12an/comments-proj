const express = require('express');
const fs = require('fs').promises;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const data = {comments:[]}

const port = 8080;

app.listen(port, () => {
    console.log(port);
})


app.post('/post-comment', (req, res) => {
    const comment = req.body.comment;
    const color = req.body.color;
    data.comments.push({comment:comment,color:color})
    res.status(200).send('Request was successful');
    console.log(comment + " in " + color + " added in " + processingTime)
});

app.get('/get-comments', (req, res) => {
    res.json(data)
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


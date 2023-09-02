import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.timeout = 10000;

const CommentStructure = () => {

    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState('');

    const [color, setColor] = useState('#000000');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // console.log(color)
            await addComment();
            await fetchComments();
        } catch (error) {
            console.log('An error occurred while submitting the comment.');
        }
    };

    const addComment = () => {
        axios.post('/post-comment', {comment, color}).catch((error) => {
            console.log(error);
        });
    };

    const fetchComments = async () => {
        axios.get('/get-comments').then((response) => {
            setComments(response.data.comments)
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchComments().catch((error) => {
            console.log('An error occurred while fetching comments.');
        });;
    }, []);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const listStyle = {
        listStyle: 'none'
    }

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer' ,
        fontSize: '16px'
    };

    const inputStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box', 
    };

    return (
    <div>
        <ul style={listStyle}>
            {comments.map((c, index) => (
                <li key={index} style={{color:c.color}}>{c.comment}</li>
            ))}
        </ul>
        <form onSubmit={handleSubmit} id="commentform">
            <input type="color" value={color} onChange={e => handleColorChange(e)}></input>
            <input type="text" style={inputStyle} value={comment} placeholder="Type Here" onChange={e => handleCommentChange(e)}></input>
            <button type="submit" style={buttonStyle}>Submit</button>
        </form>
    </div>
    );
};

export default CommentStructure;
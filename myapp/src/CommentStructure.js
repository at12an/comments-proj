import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.timeout = 5000;

const CommentStructure = () => {

    const [comments, setComments] = useState([])

    const [comment, setComment] = useState('')

    const [color, setColor] = useState('#000000')
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        addComment()
        fetchComments()
    };

    const addComment = async () => {
        try {
            await axios.post('/post-comment', { comment, color });
            // console.log('Comment submitted');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get('/get-comments');
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
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
        <form onSubmit={handleSubmit}>
            <input type="color" value={color} onChange={e => handleColorChange(e)}></input>
            <input type="text" style={inputStyle} value={comment} placeholder="Type Here" onChange={e => handleCommentChange(e)}></input>
            <button type="submit" style={buttonStyle}>Submit</button>
        </form>
    </div>
    );
};

export default CommentStructure;
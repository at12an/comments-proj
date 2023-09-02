import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitButton from './SubmitButton';
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
        <form onSubmit={handleSubmit} id="commentform">
            <div class='flex justify-center items-center mt-8 rounded-lg '>
                <div class='flex justify-between  w-1/3 bg-gray-200 rounded-full hover:bg-gray-300'>
                    <div class="rounded-full w-12 h-12 flex justify-center items-center hover:scale-105">
                        <div class="rounded-full w-8 h-8" style={{backgroundColor:color}}>
                            <input 
                                type="color"
                                value={color} 
                                onChange={e => handleColorChange(e)}
                                class="opacity-0"
                            ></input>
                        </div>
                    </div>
                    <input 
                        type="text"  
                        value={comment} 
                        placeholder="Write an interesting message!" 
                        onChange={e => handleCommentChange(e)}
                        class="flex-grow bg-transparent rounded-3xl h-12 px-4 text-gray-800 focus:outline-none  focus:text-gray-900"
                    ></input>
                    <SubmitButton />
                </div>
            </div>
            <br></br>
            {/* <button type="submit" style={buttonStyle}>Submit</button> */}``
        </form>
        <div class='flex justify-center items-center mt-8'>
            <ul style={listStyle}>
                {comments.map((c, index) => (
                    <li class="text-gray-500 italic" key={index} style={{color:c.color}}>{c.comment}</li>
                ))}
            </ul>
        </div>
    </div>
    );
};

export default CommentStructure;
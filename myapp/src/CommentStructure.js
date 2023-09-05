import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitButton from './SubmitButton';
import './index.css';
axios.defaults.timeout = 10000;

const CommentStructure = () => {

    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState('');

    const [color, setColor] = useState('#000000');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
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

    return (
    <div>
         {comments.map((c, index) => (
            <div class='flex justify-center items-center'>
                <p class="text-center box-content bg-gray-200 inline-block px-2 py-1 rounded-full absolute animate-jiggle" key={index} style={{color:c.color, top:c.y+"%",left:c.x+"%"}}>{c.comment}</p>
            </div>
        ))}
        <form onSubmit={handleSubmit} id="commentform" className='m-0 p-0'>
            <div class='flex justify-center items-center rounded-lg min-h-screen z-[100]'>
                <div class='flex justify-between  w-1/3 bg-gray-200 rounded-full hover:bg-gray-300 focus:bg-gray-300'>
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
                        class="flex-grow bg-transparent rounded-3xl h-12 px-4 text-gray-800 focus:outline-none  focus:text-gray-900 "
                    ></input>
                    <SubmitButton />
                </div>
                
            </div>
            <br></br>

        </form>
    </div>
    );
};

export default CommentStructure;
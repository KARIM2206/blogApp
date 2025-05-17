import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Context/Provider';

const CreateComment = () => {
  const [comment, setComment] = useState('');
  const [commentArr, setCommentArr] = useState([]);
  const { token,setRefreshTrigger } = useContext(AuthContext);

  useEffect(() => {
    const saved = localStorage.getItem('commentsArr');
    if (saved) {
      setCommentArr(JSON.parse(saved));
    }
  }, []);

  // 🔵 Save to localStorage whenever commentArr changes
  useEffect(() => {
    localStorage.setItem('commentsArr', JSON.stringify(commentArr));
  }, [commentArr]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
  const newComment = {
      text: comment.trim(),
      author: 'guest',
      createdAt: new Date().toLocaleDateString()
    };

    setCommentArr((prev) => [...prev, newComment]);
    setComment('');
 
    setRefreshTrigger(prev=>prev+1)
  };

  return (
    <div>
      <div className='flex flex-col gap-6 px-4 py-2 rounded-2xl'>
        <form className='flex flex-col w-full rounded-2xl' onSubmit={handleSubmit}>
          <textarea
            value={comment}
            className='rounded-2xl w-full px-2 py-2 focus:border-blue-500'
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment'
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;

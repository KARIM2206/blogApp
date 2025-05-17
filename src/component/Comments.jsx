import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Context/Provider';

const Comments = ({ postId }) => {
  const [comment, setComment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteAllComment, setDeleteAllComment] = useState(false);
  const { user, refreshTrigger } = useContext(AuthContext);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const limit = 10;

  useEffect(() => {
    const savedComments = localStorage.getItem('commentsArr');
    if (savedComments) {
      setComment(JSON.parse(savedComments));
    }
  }, [refreshTrigger]);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      setDeleteAllComment(true);
    }
  }, [user]);

  const handleDelete = (indexToDelete) => {
    const updatedComments = comment.filter((_, index) => index !== indexToDelete);
    setComment(updatedComments);
    localStorage.setItem('commentsArr', JSON.stringify(updatedComments));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(comment[index].text);
  };

  const handleSave = (index) => {
    const updatedComments = [...comment];
    updatedComments[index].text = editText;
    setComment(updatedComments);
    localStorage.setItem('commentsArr', JSON.stringify(updatedComments));
    setEditIndex(null);
    setEditText('');
  };

  return (
    <div className='flex flex-col gap-4 px-4 py-4'>
      {comment.map((singleComment, index) => (
        <div
          key={index}
          className='bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 relative'
        >
          <div className='flex items-center justify-between'>
            <div className='text-sm text-gray-700 font-semibold'>
              👤 {singleComment.author}
            </div>
            <div className='text-xs text-gray-500 px-2'>
              🕒 {formatDate(singleComment.createdAt)}
            </div>
          </div>

          {editIndex === index ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className='text-gray-800 text-base mt-2 p-2 border rounded-md'
            />
          ) : (
            <div className='text-gray-800 text-base mt-2'>{singleComment.text}</div>
          )}

          {(
            <>
              <button
                onClick={() => handleDelete(index)}
                className='absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold'
                title="Delete comment"
              >
                ×
              </button>

              {editIndex === index ? (
                <button
                  onClick={() => handleSave(index)}
                  className='absolute bottom-6 right-6 text-green-600 hover:text-green-800 font-semibold text-sm'
                >
                  💾 Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(index)}
                  className='absolute bottom-2 right-2 text-blue-500 hover:text-blue-700 font-semibold text-sm'
                >
                  ✏️ Edit
                </button>
              )}
            </>
          )}
        </div>
      ))}

      {limit > comment.length ? null : (
        <div className='flex w-full gap-4 items-center text-2xl justify-center mt-6 '>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((c) => c - 1)}
            className={`w-9 h-9 rounded-full flex items-center justify-center bg-blue-600 text-white ${
              currentPage === 1 ? 'bg-gray-400' : ''
            }`}
          >
            &lt;
          </button>
          <button
            onClick={() => setCurrentPage((c) => c + 1)}
            disabled={comment.length < limit}
            className={`w-9 h-9 rounded-full flex items-center justify-center bg-blue-600 text-white ${
              comment.length < limit ? 'bg-gray-400' : ''
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;

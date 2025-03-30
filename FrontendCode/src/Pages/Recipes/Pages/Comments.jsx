// NestedComments.js

import React, { useState, useEffect } from 'react';

function Comment({ comment, onReply , selectedRecipeForComments}) {
  const [replyText, setReplyText] = useState('');
console.log(selectedRecipeForComments)
  const handleReply = () => {
    onReply(replyText);
    setReplyText('');
  };

  if (!comment || !comment.text) {
    return null;
  }

  return (
    <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
      <p>{comment.text}</p>
      <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write your reply..."
      />
      <button onClick={handleReply}>Reply</button>
      {comment.replies && comment.replies.length > 0 && (
        <ul>
          {comment.replies.map((reply, index) => (
            <li key={index}>{reply.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NestedComments() {
  const [comments, setComments] = useState([]); // Ensure comments is initialized as an array

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/recipeComments/getcomments/:recipeId');
      const data = await response.json();
      console.log(data, 'hiiiiiiiiiiiiiiiiii'); // Inspect data fetched from server
      setComments(data); // Ensure data fetched is an array
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async (newCommentText) => {
    try {
      const response = await fetch('http://localhost:7000/api/recipeComments/addcomments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newCommentText }),
      });
      const data = await response.json();
      setComments([...comments, data]);
      console.log(data)
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddComment = () => {
    const newCommentText = prompt('Write your comment:');
    if (newCommentText.trim() !== '') {
      addComment(newCommentText);
    }
  };

  const replyToComment = async (index, replyText) => {
    if (replyText.trim() !== '') {
      try {
        const newComments = [...comments];
        newComments[index].replies.push({ text: replyText });
        setComments(newComments);
        await fetch('/api/comments', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComments[index]),
        });
      } catch (error) {
        console.error('Error replying to comment:', error);
      }
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments?.map((comment, index) => (
        <Comment key={index} comment={comment} onReply={(replyText) => replyToComment(index, replyText)} />
      ))}
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
}

export default NestedComments;

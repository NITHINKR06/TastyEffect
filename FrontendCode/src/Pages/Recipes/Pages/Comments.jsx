import React, { useState, useEffect } from 'react';
import API_URL from '../../../config';

function Comments({ selectedRecipeForComments }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    rating: '5',
    comments: '',
  });

  // The recipeId comes from the selected recipe object passed by ViewAllRecipes
  const recipeId = selectedRecipeForComments?._id;

  useEffect(() => {
    if (recipeId) {
      fetchComments();
    }
  }, [recipeId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/recipeComments/getcomments/${recipeId}`);
      const data = await response.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipeId) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/recipeComments/addcomments/${recipeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setComments((prev) => [...prev, data]);
        setForm({ fullName: '', email: '', rating: '5', comments: '' });
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <h3>Comments</h3>

      {/* Existing comments */}
      {loading ? (
        <p>Loading comments…</p>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {comments.map((c, i) => (
            <li key={c._id || i} style={{ borderBottom: '1px solid #eee', marginBottom: '12px', paddingBottom: '12px' }}>
              <strong>{c.fullName}</strong> &nbsp;
              <span style={{ color: '#f59e0b' }}>{'★'.repeat(Number(c.rating))}</span>
              <p style={{ margin: '4px 0 0' }}>{c.comments}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Add comment form */}
      <h4 style={{ marginTop: '24px' }}>Leave a comment</h4>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input
          name="fullName"
          placeholder="Your name"
          value={form.fullName}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
          ))}
        </select>
        <textarea
          name="comments"
          placeholder="Write your comment…"
          value={form.comments}
          onChange={handleChange}
          required
          rows={3}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{ padding: '10px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {submitting ? 'Posting…' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}

export default Comments;
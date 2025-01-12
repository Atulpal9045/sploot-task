import { useState } from 'react';
import styles from '../styles/CreateBlogForm.module.css';

function CreateBlogForm({ closePopup }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('Tech');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    const token = localStorage.getItem('token');

    if (!token) {
      setError('You need to be logged in to create a blog.');
      return;
    }

    // Make the API request to create a blog
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, imageUrl: link, category }),
    });

    if (response.ok) {
      // Close the popup and refresh the blogs
      closePopup();
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Failed to create blog');
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Create Blog</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Image Url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className={styles.input}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.input}
          >
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
          </select>
          <button type="submit" className={styles.submitButton}>Create Blog</button>
        </form>
        <button className={styles.closeButton} onClick={closePopup}>Close</button>
      </div>
    </div>
  );
}

export default CreateBlogForm;

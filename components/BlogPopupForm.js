import { useState } from 'react';
import styles from '../styles/CreateBlogForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for react-toastify

function CreateBlogForm({ closePopup }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('Tech');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setLoading(true); // Set loading state to true

    const token = localStorage.getItem('token');

    if (!token) {
      setError('You need to be logged in to create a blog.');
      setLoading(false); // Stop loading
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
      closePopup(); // Close the popup and refresh the blogs
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Failed to create blog');
      toast.error(errorData.message || 'Failed to create blog'); // Show error toast
    }

    setLoading(false); // Stop loading
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
          <button type="submit" className={styles.submitButton}>
            {loading ? 'Loading...' : 'Create Blog'}
          </button>
        </form>
        <button className={styles.closeButton} onClick={closePopup}>Close</button>
      </div>
      <ToastContainer /> {/* Toast notification container */}
    </div>
  );
}

export default CreateBlogForm;

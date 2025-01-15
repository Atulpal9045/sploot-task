import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify
import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // For full-screen loader
  const router = useRouter();

  // Redirect to /blogs if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(false)
      router.push('/blogs');
    }else{
      setLoading(false)
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true); // Show loader while waiting for the request

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        toast.success('Login successful! Redirecting to blogs...');
        router.push('/blogs');
      } else {
        setError(data.message || 'Invalid login credentials.');
        toast.error(data.message || 'Invalid login credentials.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Hide loader after request is finished
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Log in to access your blogs</p>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {/* Full-screen loader */}
      {loading && (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

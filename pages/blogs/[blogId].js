import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Blogs.module.css'; // Importing CSS for styling
import Header from '@/components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify

export default function Blog() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false); // Full-screen loader
  const router = useRouter();
  const { blogId } = router.query;

  useEffect(() => {
    if (!blogId) return;
    const fetchBlog = async () => {
      setLoading(true); // Show loader while fetching blog
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`);
        const data = await response.json();
        if (response.ok) {
          setBlog(data.data);
        } else {
          toast.error('Failed to fetch the blog');
        }
      } catch (error) {
        toast.error('Failed to fetch the blog');
      } finally {
        setLoading(false); // Hide loader after fetch
      }
    };
    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (!blog) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.pageContainer}>
      {/* Include Header here */}
      <Header />

      {/* Blog content section */}
      <div className={styles.blogContainer}>
        {/* Blog Image */}
        <div className={styles.blogImage} style={{ backgroundImage: `url(${blog.imageUrl})` }}></div>

        {/* Blog Content */}
        <div className={styles.blogContent}>
          <h1 className={styles.blogTitle}>{blog.title}</h1>
          <p className={styles.blogDescription}>{blog.description}</p>
          
          {/* Creator Info */}
          <div className={styles.creatorDetails}>
            <img 
              className={styles.creatorImage} 
              src="/images/creator.png" 
              alt="Creator" 
            />
            <div className={styles.creatorInfo}>
              <h3 className={styles.creatorName}>{blog.createdBy.name}</h3>
              <p className={styles.creatorEmail}>{blog.createdBy.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

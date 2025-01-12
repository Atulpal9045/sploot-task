import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Blogs.module.css'; // Importing CSS for styling
import Header from '@/components/Header';

export default function Blog() {
  const [blog, setBlog] = useState(null);
  const router = useRouter();
  const { blogId } = router.query;

  useEffect(() => {
    if (!blogId) return;
    const fetchBlog = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`);
      const data = await response.json();
      if (response.ok) {
        setBlog(data.data);
      } else {
        console.error('Failed to fetch blog');
      }
    };
    fetchBlog();
  }, [blogId]);

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
    </div>
  );
}

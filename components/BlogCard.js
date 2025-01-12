import { useRouter } from 'next/router';
import styles from '../styles/BlogCard.module.css';

export default function BlogCard({ blog }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blogs/${blog._id}`);
  };

  return (
    <div className={styles.blogCard} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        <img src={blog.imageUrl} alt={blog.title} className={styles.image} />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{blog.title}</h2>
        <p className={styles.description}>{blog.description}</p>
      </div>
    </div>
  );
}

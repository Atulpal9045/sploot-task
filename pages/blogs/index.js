import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import BlogCard from '../../components/BlogCard';
import CreateBlogForm from '@/components/BlogPopupForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify

export default function Blogs({ initialBlogs }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [categories, setCategories] = useState([
    { name: 'Tech', imageUrl: '/images/tech.png' },
    { name: 'Lifestyle', imageUrl: '/images/lifestyle.png' },
    { name: 'Health', imageUrl: '/images/health.png' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState('Tech');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Full-screen loader
  const router = useRouter();

  // Fetch blogs from the API (client-side)
  const fetchBlogs = async (category) => {
    setLoading(true); // Show loader while fetching
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?category=${category}`);
      const data = await response.json();
      if (response.ok) {
        setBlogs(data.data);
      } else {
        toast.error('Failed to fetch blogs');
      }
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false); // Hide loader after fetch
    }
  };

  useEffect(() => {
    fetchBlogs(selectedCategory);
  }, [selectedCategory]);

  const handleCreateBlogClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className="blogs-page">
      <Header />
      {/* Category selector */}
      <div className="sub-header">
        <div className="category-selector">
          {categories.map((category) => (
            <div className='btn-container' key={category.name}>
              <button
                onClick={() => setSelectedCategory(category.name)}
                className={category.name === selectedCategory ? 'selected' : ''}
              >
                <img src={category.imageUrl} alt={category.name} width={40} height={40} />
                <span>{category.name}</span>
              </button>
            </div>
          ))}
        </div>

        <button className="create-blog-btn" onClick={handleCreateBlogClick}>Create Blog</button>
      </div>
      
      {/* Blog list */}
      {loading ? (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="empty-blog">
          <img src="/images/nocotent.jpg" alt="No content" />
        </div>
      ) : (
        <div className="blog-list">
          {blogs
            .filter((blog) => blog.category === selectedCategory)
            .map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
      )}

      {/* Popup for creating a blog */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create Blog</h2>
            <CreateBlogForm closePopup={() => setIsPopupOpen(false)} />
          </div>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

// ISR (Revalidate every hour) for Blogs page
export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.LIVE_URL}/blogs`);
    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`);
    }
    const data = await res.json();
    return {
      props: {
        initialBlogs: data.data || [],
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return {
      props: {
        initialBlogs: [],
      },
      revalidate: 3600,
    };
  }
}

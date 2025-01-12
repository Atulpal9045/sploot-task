import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css'; // assuming the styles are in a separate CSS module file

export default function Header() {
  const [user, setUser] = useState(null);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false); // State to control visibility of profile options
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }
          const data = await response.json();
          setUser(data.data.user);
        } catch (error) {
          console.error(error);
          localStorage.removeItem('token');
          router.push('/');
        }
      };
      fetchUser();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuVisible(!isProfileMenuVisible); // Toggle profile menu visibility
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Blog App</h1>
      </div>
      <div className={styles.userSection}>
        {user ? (
          <div className={styles.profileContainer}>
            <div className={styles.profileIcon} onClick={toggleProfileMenu}>
              <span className={styles.userName}>{user.name}</span>
              <img
                className={styles.profilePic}
                src="/images/profile.png" // Replace with dynamic profile image
                alt="User Profile"
              />
            </div>

            {/* Dropdown for user name and logout button */}
            {isProfileMenuVisible && (
              <div className={styles.profileMenu}>
                {/* <span className={styles.userName}>{user.name}</span> */}
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className={styles.loginBtn} onClick={() => router.push('/')}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

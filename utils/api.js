import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getCategories = () => api.get('/categories');
export const getBlogs = (categoryId) => api.get(`/blogs?category=${categoryId}`);
export const createBlog = (data) => api.post('/blogs', data);
export default api;

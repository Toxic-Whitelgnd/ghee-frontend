import axios from 'axios';

// Create a function to configure axios globally
export const configureAxios = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

export default axios;

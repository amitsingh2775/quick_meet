

import axios from 'axios';

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/profile', {
      withCredentials: true, // Ensure cookies are sent with the request
    });

    return response.data.user 
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

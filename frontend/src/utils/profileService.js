import axios from 'axios';

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/profile', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/update', profileData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    return null;
  }
};

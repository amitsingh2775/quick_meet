

import axios from 'axios';

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/profile', {
      withCredentials: true, // Ensure cookies are sent with the request
    });

    // console.log("response ",response);
    // console.log("rw",response.data.name );
    
    return response.data 
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

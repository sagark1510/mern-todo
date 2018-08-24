import axios from 'axios';

export const registerUser = async user => {
  const response = await axios.post('/api/users/register', user);
  return response.data;
};

import axios from 'axios';

export const fetchTask = async ({todoId}) => {
  const response = await axios.get(`/api/tasks/${todoId}`);
  return response.data;
};

export const saveTask = async task => {
  const response = await axios.post('/api/tasks/save', task);
  return response.data;
};

export const markTask = async task => {
  const response = await axios.post('/api/tasks/mark', task);
  return response.data;
};

export const deleteTask = async task => {
  const response = await axios.post('/api/tasks/delete', task);
  return response.data;
};

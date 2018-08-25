import axios from 'axios';

export const fetchTodo = async () => {
  const response = await axios.get('/api/todos');
  return response.data;
};

export const saveTodo = async todo => {
  const response = await axios.post('/api/todos/save', todo);
  return response.data;
};

export const deleteTodo = async id => {
  const response = await axios.post('/api/todos/delete', {id});
  return response.data;
};

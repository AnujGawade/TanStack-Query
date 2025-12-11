import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// to fetch the data
export const fetchPosts = async (page) => {
  try {
    const res = await api.get(`/posts?_start=${page}&_limit=3`);
    console.log(res);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

// to fetch indv data
export const fetchInvost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

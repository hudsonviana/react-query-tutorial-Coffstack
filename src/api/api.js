import axios from 'axios';
const URL = 'https://667b337fbd627f0dcc91fac2.mockapi.io';

// const axiosInstance = axios.create({ baseURL: URL });

async function getUsers() {
  const res = await axios.get(`${URL}/users`);
  return res.data;

  // const res = await axiosInstance.get('/users');
  // return res.data;

  // const res = await fetch(`${URL}/users`);
  // const data = await res.json();
  // return data;

  // const data = fetch(`${URL}/users`)
  //   .then((res) => res.json())
  //   .then((data) => data);
  // return data;
}

async function updateUserName(userId, name) {
  const res = await axios.put(`${URL}/users/${userId}`, { name: name });
  return res.data;
}

export { getUsers, updateUserName };

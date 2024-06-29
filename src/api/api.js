import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
const URL = 'https://667b337fbd627f0dcc91fac2.mockapi.io';

// const axiosInstance = axios.create({ baseURL: URL });

export const fetchAllUsers = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: async ({ signal }) => {
      return (await axios.get(`${URL}/users`, { signal })).data;
    },
  });
};

export const fetchUser = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: async ({ signal }) => {
      return (await axios.get(`${URL}/users/${id}`, { signal })).data;
    },
  });

  return { data, isLoading, isError };
};

async function getUsers() {
  const res = await axios.get(`${URL}/users`);
  const users = res.data;
  return users;

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

async function findUser(id) {
  const res = await axios.get(`${URL}/users/${id}`);
  return res.data;
}

async function updateUserName(id, name) {
  const res = await axios.put(`${URL}/users/${id}`, { name: name });
  return res.data;
}

export const updateUser = (id, name) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      return (await axios.put(`${URL}/users/${id}`, { name: name })).data;
    },
    onMutate: () => console.log('Mutate'),
    onSuccess: () => console.log('Success'),
    onError: () => console.log('Error'),
    onSettled: async (data, error) => {
      console.log('Settled:', data);
      if (error) {
        console.log('error settled');
      } else {
        await queryClient.invalidateQueries(['allUsers']);
        navigate('/');
      }
    },
  });
};

export { getUsers, updateUserName, findUser };

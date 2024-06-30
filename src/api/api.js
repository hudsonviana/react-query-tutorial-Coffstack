import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
const URL = 'https://667b337fbd627f0dcc91fac2.mockapi.io';

// const axiosInstance = axios.create({ baseURL: URL });

export const getUsers = async () => {
  const res = await axios.get(`${URL}/users`);
  return res.data;
};

export const findUser = async (id) => {
  const res = await axios.get(`${URL}/users/${id}`);
  return res.data;
};

export const updateUserName = async (id, name) => {
  const res = await axios.put(`${URL}/users/${id}`, { name: name });
  return res.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${URL}/users/${id}`);
};

// Tanstack React Query functions

export const fetchAllUsers = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: async ({ signal }) => {
      return (await axios.get(`${URL}/users`, { signal })).data;
    },
  });
};

export const fetchUser = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async ({ signal }) => {
      return (await axios.get(`${URL}/users/${id}`, { signal })).data;
    },
  });
};

export const getIDs = () => {
  return useQuery({
    queryKey: ['allIDs'],
    queryFn: async ({ signal }) => {
      return (await axios.get(`${URL}/users`, { signal })).data.map(
        (user) => user.id
      );
    },
  });
};

export const getUsersInParallel = (ids) => {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ['user', { id }],
        queryFn: () => findUser(id),
      };
    }),
  });
};

export const updateUser = (id, name) => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

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
        await queryClient.invalidateQueries({ queryKey: ['allUsers'] });
        // navigate('/');
      }
    },
  });
};

export const updateSingleUser = (id, name) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateUserName(id, name),
    onSettled: async (data, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        // await queryClient.invalidateQueries({ queryKey: ['allIDs'] });
        await queryClient.invalidateQueries({
          queryKey: ['user', { id }],
        });
      }
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteUser(id),
    onSettled: async (data, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['allIDs'] });
      }
    },
  });
};

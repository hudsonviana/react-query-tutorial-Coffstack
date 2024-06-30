import {
  keepPreviousData,
  useInfiniteQuery,
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

const getProjects = async (page = 1) => {
  const res = await axios.get(`${URL}/projects?page=${page}&limit=5`);
  return res.data;
};

const getProducts = async ({ pageParam }) => {
  const res = await axios.get(`${URL}/projects?page=${pageParam + 1}&limit=5`);
  return res.data;
};

const getProduct = async (id) => {
  const res = await axios.get(`${URL}/projects/${id}`);
  return res.data;
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

export const useProjects = (page) => {
  return useQuery({
    queryKey: ['projects', page],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  });
};

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
};

export const useProduct = (id) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProduct(id),
    enabled: !!id,
    placeholderData: () => {
      const cachedProducts = queryClient
        .getQueryData(['products'])
        ?.pages?.flat(2);

      if (cachedProducts) {
        return cachedProducts.find((item) => item.id === id);
      }
    },
  });
};

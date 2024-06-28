import { useState, useEffect } from 'react';
import { getUsers } from './api/api';
import UserCard from './UserCard';
import { useQuery } from '@tanstack/react-query';

const UserList = () => {
  // const [userList, setUserList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(null);

  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       setIsLoading(true);
  //       const users = await getUsers();
  //       setUserList(users);
  //     } catch (error) {
  //       setIsError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchUsers();
  // }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userList'],
    queryFn: getUsers,
  });

  return (
    <>
      <h2>Lista de Usuários</h2>

      {isLoading && <h3>Carregando...</h3>}
      {isError && <p>Ocorreu um erro ao carregar os dados da api.</p>}

      {data?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </>
  );
};

export default UserList;

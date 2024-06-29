import { useState, useEffect } from 'react';
import { fetchAllUsers, getUsers } from './api/api';
import UserCard from './UserCard';
import { useQuery } from '@tanstack/react-query';

const FetchTest = () => {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(null);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   async function fetchUsers() {
  //     try {
  //       const users = await getUsers(controller);
  //       setData(users);
  //     } catch (error) {
  //       setIsError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchUsers();
  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['userList'],
  //   queryFn: async () => await getUsers(),
  // });

  const { data, isLoading, isError } = fetchAllUsers();

  return (
    <>
      {isLoading && <h3>Carregando...</h3>}
      {isError && <p>Ocorreu um erro ao carregar os dados da api.</p>}

      {data?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </>
  );
};

const UserList = () => {
  const [show, setShow] = useState(true);

  const handleButton = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <h2>Lista de Usuários</h2>
      <button onClick={handleButton}>{!show ? 'Exibir' : 'Ocultar'}</button>
      {show && <FetchTest />}
    </>
  );
};

export default UserList;

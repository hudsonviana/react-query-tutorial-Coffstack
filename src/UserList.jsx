import { useState, useEffect } from 'react';
import { getUsers } from './api/api';
import UserCard from './UserCard';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const users = await getUsers();
        setUserList(users);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <>
      <h2>Lista de Usuários</h2>

      {isLoading && <h3>Carregando...</h3>}
      {isError && <p>Ocorreu um erro ao carregar os dados da api.</p>}

      {userList?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </>
  );
};

export default UserList;

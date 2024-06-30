import { useState } from 'react';
import { fetchAllUsers, getIDs, getUsersInParallel } from './api/api';
import UserCard from './UserCard';
import EditUser from './EditUser';

const FetchTest = () => {
  const [selectedUser, setSelectedUser] = useState({ id: '', name: '' });

  // const { data, isLoading, isError } = fetchAllUsers();

  const usersIDs = getIDs();
  const usersQueries = getUsersInParallel(usersIDs.data);

  return (
    <>
      <h2>Editar usuário</h2>
      <EditUser selectedUser={selectedUser} />

      <h2>Lista de Usuários</h2>

      {/* {isLoading && <h3>Carregando...</h3>} */}
      {/* {isError && <p>Ocorreu um erro ao carregar os dados da api.</p>} */}

      {/* {data?.map((user) => (
        <UserCard key={user.id} user={user} selectUser={setSelectedUser} />
        ))} */}

      {usersQueries.map(({ data }) => (
        <UserCard key={data?.id} user={data} selectUser={setSelectedUser} />
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
      <button onClick={handleButton}>{!show ? 'Exibir' : 'Ocultar'}</button>
      {show && <FetchTest />}
    </>
  );
};

export default UserList;

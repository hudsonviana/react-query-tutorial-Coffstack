// import { Link } from 'react-router-dom';
import './UserCard.css';
import { useDeleteUser } from './api/api';

const UserCard = ({ user, selectUser }) => {
  const deleteUserMutation = useDeleteUser();

  const handleDeleteBtn = async (id) => {
    await deleteUserMutation.mutateAsync(id);
    console.log(`Usuário: ${user.name} foi deletado com sucesso!!!`);
  };

  return (
    <div className="card">
      <img src={user?.avatar} />
      <div style={{ marginLeft: '15px' }}>
        <h3>{user?.name}</h3>
        {/* <Link to={`/edit/${user.id}`}>Editar</Link> */}
        <button
          onClick={() => selectUser(user)}
          style={{ color: '#646cff', marginRight: '10px' }}
        >
          Editar
        </button>
        {user && user.id && (
          <button
            onClick={() => handleDeleteBtn(user.id)}
            style={{ color: 'yellowgreen', marginRight: '10px' }}
          >
            Deletar
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;

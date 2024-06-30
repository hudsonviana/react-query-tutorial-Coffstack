import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { findUser, updateUser } from './api/api';
import './UserCard.css';

const editLoader = async ({ params }) => {
  const user = await findUser(params.id);
  return { user };
};

const Edit = () => {
  const { user } = useLoaderData();
  const [name, setName] = useState(user.name);

  const updateUserMutation = updateUser(user.id, name);

  const handleClick = () => {
    updateUserMutation.mutate();
  };

  return (
    <div className="card">
      <img src={user.avatar} />
      <div style={{ marginLeft: '15px' }}>
        <h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </h3>
        <div>
          <button onClick={handleClick} style={{ marginRight: '10px' }}>
            Salvar
          </button>
          <Link to={'/'}>Voltar</Link>
        </div>
      </div>
    </div>
  );
};

export { Edit as default, editLoader };

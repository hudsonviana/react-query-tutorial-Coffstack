import { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { findUser, updateUserName } from './api/api';
import './UserCard.css';

const editLoader = async ({ params }) => {
  const user = await findUser(params.id);
  return { user };
};

const Edit = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: () => updateUserName(user.id, name),
    onSuccess: () => navigate('/'),
    // onSuccess: () => queryClient.invalidateQueries(['userList']),
  });

  const handleClick = () => {
    mutate({
      onSuccess: queryClient.invalidateQueries(['userList']),
      // onSuccess: navigate('/'),
    });
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

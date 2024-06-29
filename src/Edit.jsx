import { useState } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUser, findUser, updateUser, updateUserName } from './api/api';
import './UserCard.css';

const editLoader = async ({ params }) => {
  const user = await findUser(params.id);
  return { user };
};

const Edit = () => {
  // const { id } = useParams();
  // const { data, isLoading } = fetchUser(id);
  // console.log('use Query:', data);
  // const user = data;

  const { user } = useLoaderData();
  const [name, setName] = useState(user.name);
  // const navigate = useNavigate();

  // const queryClient = useQueryClient();
  // const { isPending, mutate } = useMutation({
  //   mutationFn: () => updateUserName(user.id, name),
  //   onSuccess: () => navigate('/'),
  //   // onSuccess: () => queryClient.invalidateQueries(['userList']),
  // });

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

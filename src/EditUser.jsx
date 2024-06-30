import { useEffect, useState } from 'react';
import { updateSingleUser } from './api/api';

const EditUser = ({ selectedUser }) => {
  const [name, setName] = useState(selectedUser.name);

  useEffect(() => {
    setName(selectedUser.name);
  }, [selectedUser]);

  // const updateUserMutation = updateUser(selectedUser.id, name);
  const updateUserMutation = updateSingleUser(selectedUser.id, name);

  const handleClick = () => {
    updateUserMutation.mutate();
  };

  return (
    <div className="card">
      <img src={selectedUser.avatar} />
      <div style={{ marginLeft: '15px' }}>
        <h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </h3>
        <div>
          <button
            onClick={handleClick}
            disabled={
              !name ? true : updateUserMutation.isPending ? true : false
            }
            style={{ marginRight: '10px' }}
          >
            {updateUserMutation.isPending ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

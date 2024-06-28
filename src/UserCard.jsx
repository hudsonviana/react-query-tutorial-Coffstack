import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="card">
      <img src={user.avatar} />
      <div style={{ marginLeft: '15px' }}>
        <h3>{user.name}</h3>
        <Link to={`/edit/${user.id}`}>Editar</Link>
      </div>
    </div>
  );
};

export default UserCard;

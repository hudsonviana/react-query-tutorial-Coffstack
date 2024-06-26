const UserCard = ({ user, onClickEdit }) => {
  const styles = {
    border: '1px solid #fefefe',
    padding: '10px',
    margin: '20px',
    display: 'flex',
    borderRadius: '10px',
  };

  return (
    <div style={styles}>
      <img src={user.avatar} />
      <div style={{ marginLeft: '15px' }}>
        <h3>{user.name}</h3>
        <button onClick={onClickEdit} style={{ marginRight: '10px' }}>
          Editar
        </button>
        {/* <button
          onClick={onClickEdit}
          style={{ marginRight: '10px', backgroundColor: 'rgb(194,65,12)' }}
        >
          Deletar
        </button> */}
      </div>
    </div>
  );
};

export default UserCard;

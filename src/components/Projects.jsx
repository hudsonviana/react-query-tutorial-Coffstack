import { useState } from 'react';
import { useProjects } from '../api/api';

const Projects = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error, isPlaceholderData, isFetching } =
    useProjects(page);

  return (
    <>
      {isPending ? (
        <div>Carregando...</div>
      ) : isError ? (
        <div>Erro: {error.message}</div>
      ) : (
        <ul>
          {data.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      )}
      <span>Página atual: {page}</span>{' '}
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        {'<'}
      </button>{' '}
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        {'>'}
      </button>{' '}
      {isFetching ? <span>Loading...</span> : null}
    </>
  );
};

export default Projects;

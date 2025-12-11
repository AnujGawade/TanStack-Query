import { NavLink } from 'react-router-dom';
import { fetchPosts } from '../api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const FetchRQ = () => {
  const [page, setPage] = useState(0);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts', page], // useState
    queryFn: () => fetchPosts(page), // useEffect
    placeholderData: keepPreviousData,

    // // gcTime: 1000,
    // // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  if (isPending) return <p>Loading .....</p>;
  if (isError) return <p>Error: {error.message || 'Something went wrong!'} </p>;

  return (
    <div>
      <ul className="section-accordian">
        {data?.map((curElem) => {
          return (
            <li key={curElem.id}>
              <NavLink to={`/rq/${curElem.id}`}>
                <p>{curElem.id}</p>
                <p>{curElem.title}</p>
                <p>{curElem.body}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="pagination-section container">
        <button
          disabled={page === 0 ? true : false}
          onClick={() => setPage((prev) => prev - 3)}
        >
          Prev
        </button>
        <h2>{page / 3 + 1}</h2>
        <button onClick={() => setPage((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};

export default FetchRQ;

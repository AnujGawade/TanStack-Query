import { fetchPosts } from '../api';
import { useQuery } from '@tanstack/react-query';

const FetchRQ = () => {
  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      return res.status === 200 ? res.data : [];
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts'], // useState
    queryFn: getPostsData, // useEffect
    // gcTime: 1000,
    staleTime: 10000,
  });

  if (isPending) return <p>Loading .....</p>;
  if (isError) return <p>Error: {error.message || 'Something went wrong!'} </p>;

  return (
    <div>
      <ul className="section-accordian">
        {data?.map((curElem) => {
          return (
            <li key={curElem.id}>
              <p>{curElem.title}</p>
              <p>{curElem.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchRQ;

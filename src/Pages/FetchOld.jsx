import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchPosts } from '../api';

const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      if (res.status === 200) {
        setPosts(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  if (isLoading) return <p>Loading .....</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div>
      <ul className="section-accordian">
        {posts.map((curElem) => {
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

export default FetchOld;

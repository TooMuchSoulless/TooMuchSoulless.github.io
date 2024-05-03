import { useState, useEffect } from 'react';

const Post = () => {
  const [post, setPost] = useState({
    id: "",
    cover: "",
    title: "",
    content: "",
  });
  const [likes, setLikes] = useState(0);

  const likeThis = () => {
    setLikes(likes + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/TooMuchSoulless/db1/posts/2');
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const likeButton = document.getElementById('like');
    if (likeButton) {
      likeButton.addEventListener('click', likeThis);
      return () => {
        likeButton.removeEventListener('click', likeThis);
      };
    }
  }, [likeThis]);

  return (
    <article className='post'>
    <div className='cover-container'>
      <img src={post.cover} alt={post.title} className='image'/>
    </div>
    <div className='post-footer'>
      <h3>{post.title} <br/><span>Стаття №</span> {post.id}</h3>
      <p>{post.content}</p>
      <button id='like'>
      Like this post <strong>{likes}</strong>
      </button>
    </div>
  </article>
  );
};

export default Post;

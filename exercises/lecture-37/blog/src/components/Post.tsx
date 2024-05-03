import { useState, useEffect, useContext, createContext, ReactNode } from 'react';

const PostContext = createContext({
    id: "",
    cover: "",
    title: "",
    content: "",
});

const Layout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const Header = () => {
  return <h1 className='header'>Розгортайте наш блог із захоплюючими матеріалами, щоб відкрити для себе світ нових знань, цікавих історій та корисних порад!</h1>;
};

const PostTitle = () => {
  const post = useContext(PostContext);
  return <h3 className="post-title">{post.title} <br/><span>Стаття №</span> {post.id}</h3>;
};

const PostMain = () => {
  const post = useContext(PostContext);
  const [likes, setLikes] = useState(0);

  const likeThis = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="post-main">
      <img src={post.cover} alt={post.title} className='image'/>
      <div>
        <p>{post.content}</p>
        <button id='like' onClick={likeThis}>
          Like this post <strong>{likes}</strong>
        </button>
      </div>
    </div>
  );
};

const Post = () => {
  const [post, setPost] = useState(null);

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

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <PostContext.Provider value={post}>
      <Layout>
        <Header />
        <PostTitle />
        <PostMain />
      </Layout>
    </PostContext.Provider>
  );
};

export default Post;
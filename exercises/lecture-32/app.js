const url = "https://jsonplaceholder.typicode.com/posts";

const template = (item) => `
<h3>${item.title}</h3>
<div>${item.body}</div>
<p>Author: <strong><span class="author" data-id="${item.userId}"></stan></strong></p>
`;

const fetchPosts = async (url) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
};

const fetchUserData = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  return response.json();
};

const renderData = async () => {
  try {
    const posts = await fetchPosts(url);
    const usersPromises = posts.map(post => fetchUserData(post.userId));
    const users = await Promise.all(usersPromises);
    
    let result = '';
    posts.forEach((post, index) => {
      const userName = users[index].name;
      result += template({ ...post, userName });
    });

    document.getElementById("blog").innerHTML = result;

  } catch (error) {
    console.error('Error:', error);
  }
};

renderData();


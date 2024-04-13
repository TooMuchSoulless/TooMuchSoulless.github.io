//Завдання 1
//Посилання на сервер: https://my-json-server.typicode.com/TooMuchSoulless/db

//Завдання 2
const url = "https://jsonplaceholder.typicode.com/posts";

const template = (item) => `
<h3>${item.title}</h3>
<div>${item.body}</div>
<p>Author: <strong><span class="author" data-id="${item.userId}"></span></strong></p>
`;

const xhrPromise = (method, url) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };
  });

  return promise;
};

xhrPromise("GET", url)
.then((response) => {
  const posts = JSON.parse(response);
  let result = "";
  posts.forEach((item) => {
    result += template(item);
  });
  document.getElementById("blog").innerHTML = result;
})

.then(response => {
  const users = JSON.parse(response);
  const authors = document.querySelectorAll('.author');

  users.forEach(user => {
    authors.forEach(author => {
      if (author.dataset.id === user.id.toString()) {
        author.textContent = user.name;
      }
    });
  });
})

//з лекції
/* .then(() => {
  const users = document.querySelectorAll('.author');
  users.forEach(user => {
    xhrPromise('GET', `https://jsonplaceholder.typicode.com/users/${user.dataset.id}`)
    .then(response => {
      let userName = JSON.parse(response)
      user.textContent = userName.name
    })
  })
})*/

.catch(error => {
  console.error('Error:', error);
});

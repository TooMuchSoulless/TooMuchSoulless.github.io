//Завдання 1
setTimeout(() => {
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const h1 = document.querySelector('h1#waiting');

    if (!firstName && !lastName) {
        h1.textContent = "I miss You";
    } else {
        h1.textContent = `Hello ${firstName} ${lastName}!`;
    }

}, 10000);

//Завдання 2
const template = (item) => `
<h3>${item.title}</h3>
<div>${item.body}</div>
`;

let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);

xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        let posts = JSON.parse(xhr.responseText);

        let postsTmpl = '';
        posts.forEach(function(post) {
            postsTmpl += template(post);
        });

        document.getElementById('demo').innerHTML = postsTmpl;
    } else {
        console.error('Error: ' + xhr.status);
    }
};

xhr.onerror = function() {
    console.error('An error occurred while executing the request.');
};

xhr.send();

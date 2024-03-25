const alert = document.querySelector('.alert');

//Завдання 1
const btnPrimary = document.querySelector('.btn-primary');

btnPrimary.onclick = function() {
    alert.classList.add('alert-primary');
    alert.textContent = "A simple primary alert—check it out!";
};

//Завдання 2
const btnSecondary = document.querySelector('.btn-secondary');

btnSecondary.addEventListener('click', () => {
    alert.classList.add('alert-primary');
    alert.textContent = "A simple secondary alert—check it out!";
});

//Завдання 3
const btnSuccess = document.querySelector('.btn-success');

btnSuccess.addEventListener('mouseover', () => {
    alert.classList.add('alert-success');
    alert.textContent = "A simple success alert—check it out!";
});

btnSuccess.addEventListener('mouseout', () => {
    alert.classList.remove('alert-success');
    alert.textContent = "";
});

//Завдання 4
const btnDanger = document.querySelector('.btn-danger');

btnDanger.addEventListener('focus', () => {
    alert.classList.add('alert-danger');
    alert.textContent = "A simple danger alert—check it out!";
});

btnDanger.addEventListener('focusout', () => {
    alert.classList.remove('alert-danger');
    alert.textContent = "";
});

//Завдання 5
function toggleMode() {
    const body = document.body;
    const btnDark = document.querySelector('.btn-dark');
    const btnLight = document.querySelector('.btn-light');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        btnDark.classList.add('hide');
        btnLight.classList.remove('hide');
    } else {
        btnDark.classList.remove('hide');
        btnLight.classList.add('hide');
    }
}

const btnDark = document.querySelector('.btn-dark');
const btnLight = document.querySelector('.btn-light');

btnLight.classList.add('hide');

btnDark.addEventListener('click', toggleMode);
btnLight.addEventListener('click', toggleMode);

//Завдання 6
const btnInfo = document.querySelector('.btn-info');

btnInfo.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        alert.classList.add('alert-info');
        alert.textContent = "A simple info alert—check it out!";
    }
});

//Завдання 7
const cards = document.querySelectorAll('.card');

for (let i = 0; i < cards.length; i++) {
    const cardTtl = cards[i].querySelector('.card-title');
    console.log(cardTtl.textContent);
}

//Завдання 8
for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardTtl = card.querySelector('.card-title');
    const btnAddToCart = card.querySelector('.add-to-cart');
    
    btnAddToCart.addEventListener('click', () => {
        console.log(cardTtl.textContent);
    });
}
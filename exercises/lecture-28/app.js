document.addEventListener("DOMContentLoaded", function() {
    const rgstrForm = document.getElementById("registrationForm");
    const errorMessages = document.getElementById("errorMessages");

    rgstrForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        errorMessages.innerHTML = "";

        const username = rgstrForm.username.value.trim();
        const email = rgstrForm.email.value.trim();
        const password = rgstrForm.password.value;

        if (username === "") {
            displayError("Ім’я користувача не може бути пустим.");
            return;
        }

        if (!isValidEmail(email)) {
            displayError("Неправильний формат електронної адреси.");
            return;
        }

        if (password.length < 8) {
            displayError("Пароль має містити принаймні 8 символів.");
            return;
        }

        if (!isValidPassword(password)) {
            displayError("Пароль має містити принаймні одну велику літеру, одну малу літеру, одну цифру та один спеціальний символ.");
            return;
        }

        rgstrForm.reset();

    });

    function displayError(message) {
        errorMessages.innerHTML += `<div>${message}</div>`;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(password);
    }

});
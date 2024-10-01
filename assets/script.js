// CONSTS

const username = document.querySelector('#exampleInputEmail1');
const password = document.querySelector('#exampleInputPassword1');
const submitButton = document.querySelector('#submitButton');

const existingUser = JSON.parse(localStorage.getItem('user')) || [];

const user = {
    username,
    password
};

// LETS

let redirectURL = ('index.html');

// EVENT LISTENERS

submitButton.addEventListener('click', storeSubmission)

// VARIABLES AS FUNCITONS

const redirectPage = function (url) {
  redirectURL = url;
  location.assign(url);
};

// FUNCTIONS

function storeSubmission(event) {
    event.preventDefault();

    if (!username || !password) {
        document.querySelector(HEYYOTHISNEEDSTOSELECTSOMETHING).innerText = "Please enter a valid email and password.";
        return;
    } else {
        localStorage.setItem('user', JSON.stringify(user));
        redirectPage('userHome.html');
    };
}

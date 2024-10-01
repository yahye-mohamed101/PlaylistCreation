// CONSTS


const usernameInput = document.querySelector('#exampleInputEmail1');
const passwordInput = document.querySelector('#exampleInputPassword1');
const submitButton = document.querySelector('#loginForm');
const logoutButton = document.querySelector('#logout');
const form = document.querySelector('#newTuneForm');
const recentlyAdded = document.querySelector('#recentlyAdded');
const toggleButton = document.querySelector('#toggleButton');
const body = document.body;

//TOGGLE BUTTON FUNCTION

//const savedTheme = localStorage.getItem('theme');
//if (savedTheme === 'dark') {
    //body.setAttribute('data-theme', 'dark');
    //toggleButton.checked = true; // Set slider to checked
//}

// Function to toggle between light and dark mode
function toggleTheme() {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Add event listener to the toggle button
toggleButton.addEventListener('change', toggleTheme);



const existingUser = JSON.parse(localStorage.getItem('user')) || [];

const tunes = JSON.parse(localStorage.getItem('tunes')) || [];

// LETS

let redirectURL = '';

// EVENT LISTENERS

submitButton?.addEventListener('submit', storeSubmission);

logoutButton?.addEventListener('click', function() {
    redirectPage('index.html');
});

form?.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const artistName = document.querySelector('#artistName').value;
    const songTitle = document.querySelector('#songTitle').value;
    const urlAudio = document.querySelector('#urlAudio').value;
  
    const newTune = {
      artistName,
      songTitle,
      urlAudio
    };
  
    storeTune(newTune);
  
    addTuneToList(newTune);
  
    form.reset();
  });

// VARIABLES AS FUNCITONS

const redirectPage = function (url) {
  redirectURL = url;
  location.assign(url);
};

// FUNCTIONS

function storeSubmission(event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
        //.innerText = "Please enter a valid email and password."; Use a valid selector
        return;
    } else {
        const user = {
            username,
            password
        };
        localStorage.setItem('user', JSON.stringify(user));
        redirectPage('userHome.html');
    }
}

function storeTune(tune) {
    let tunes = JSON.parse(localStorage.getItem('tunes')) || [];
    tunes.push(tune);
    localStorage.setItem('tunes', JSON.stringify(tunes));
}

function addTuneToList(tune) {
    const li = document.createElement('li');
    const tuneLink = document.createElement('a');
    
    tuneLink.href = tune.urlAudio;
    tuneLink.target = "_blank";
    tuneLink.textContent = `${tune.artistName} - ${tune.songTitle}`;

    li.appendChild(tuneLink);
    recentlyAdded.appendChild(li);
}

function loadStoredTunes() {
    tunes.forEach(tune => addTuneToList(tune));
}

toggleTheme();
/* TOGGLE BUTTON FUNCTION

let isDarkMode = false;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    isDarkMode = true;
    body.setAttribute('data-theme', 'dark');
    toggleButton.textContent = 'Switch to Light Mode';

}

function toggleTheme() {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        body.setAttribute('data-theme', 'dark');
        toggleButton.textContent = 'Switch to Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
        toggleButton.textContent = 'Switch to Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}
toggleButton.addEventListener('click', toggleTheme);
toggleTheme(); */
// CONSTS


const usernameInput = document.querySelector('#exampleInputEmail1');
const passwordInput = document.querySelector('#exampleInputPassword1');
const submitButton = document.querySelector('#loginForm');
const logoutButton = document.querySelector('#logout');
const form = document.querySelector('#newTuneForm');
const recentlyAdded = document.querySelector('#recentlyAdded');


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
        //.innerText = "Please enter a valid email and password."; // Use a valid selector
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
    li.textContent = `${tune.artistName} - ${tune.songTitle} (${tune.urlAudio})`;
    recentlyAdded.appendChild(li);
}

function loadStoredTunes() {
    tunes.forEach(tune => addTuneToList(tune));
}
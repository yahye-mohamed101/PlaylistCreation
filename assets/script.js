// CONSTS

const usernameInput = document.querySelector('#exampleInputEmail1');
const passwordInput = document.querySelector('#exampleInputPassword1');
const submitButton = document.querySelector('#loginForm');
const logoutButton = document.querySelector('#logout');
const form = document.querySelector('#newTuneForm');
const recentlyAdded = document.querySelector('#recentlyAdded');
const newPlaylistInput = document.querySelector('#newPlaylist');
const createButton = document.querySelector('#createPlaylist');
const playlistAccordian = document.querySelector('#playlistAccordian');
const body = document.body;
const toggleButton = document.querySelector('.toggleButton');
const h5 = document.querySelector('h5');
const accordionContainer = document.querySelector('#accordionExample');

const existingUser = JSON.parse(localStorage.getItem('user')) || [];

const tunes = JSON.parse(localStorage.getItem('tunes')) || [];

// LETS

let redirectURL = '';

// EVENT LISTENERS

submitButton?.addEventListener('submit', storeSubmission);

logoutButton?.addEventListener('click', function () {
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

createButton?.addEventListener('click', function () {
    const playlistName = newPlaylistInput.value;
    if (playlistName === '') return;
    const newAccordionId = `playlist-${playlistName}`;

    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion-item');

    const h2 = document.createElement('h2');
    h2.classList.add('accordion-header');

    const button = document.createElement('button');
    button.classList.add('accordion-button', 'collapsed');
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', `#${newAccordionId}`);
    button.textContent = playlistName;

    h2.appendChild(button);
    const someDiv = document.createElement('div');
    someDiv.classList.add('accordion-collapse', 'collapse');
    someDiv.id = newAccordionId;
    someDiv.setAttribute('data-bs-parent', '#accordionExample');

    const someOtherDiv = document.createElement('div');
    someOtherDiv.classList.add('accordion-body');

    const ul = document.createElement('ul');

    someOtherDiv.appendChild(ul);
    someDiv.appendChild(someOtherDiv);
    accordionItem.appendChild(someDiv);
    accordionItem.appendChild(h2);
    accordionContainer.appendChild(accordionItem);

    newPlaylistInput.value = '';
});

/*
createButton?.addEventListener('click', function () {
    const playlistName = newPlaylistInput.value.trim();
    const h4 = document.createElement('h4');
    const li = document.createElement('li');
    if (playlistName === '') return;
    li.classList.add('playlist-item');
    h4.textContent = playlistName;
    li.appendChild(h4);
    playlistAccordian.appendChild(li);
    newPlaylistInput.value = '';
});
*/

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
        //.innerText = "Please enter a valid something and password."; WE MIGHT NEED THIS IF WE CHANGE THE LOGIN FROM AN EMAIL TO A USERNAME.
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
    const a = document.createElement('a');

    a.href = tune.urlAudio;
    a.target = "_blank";
    a.textContent = `${tune.artistName} - ${tune.songTitle}`;

    li.appendChild(a);
    recentlyAdded.appendChild(li);
}

function loadStoredTunes() {
    tunes.forEach(tune => addTuneToList(tune));
}

// IFS

if(existingUser.username) {
    const loggedIn = document.querySelector('.username');
    loggedIn.textContent = `${existingUser.username}`;
}

//T OGGLE BUTTON FUNCTION

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
        h5.setAttribute('data-theme', 'dark');
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
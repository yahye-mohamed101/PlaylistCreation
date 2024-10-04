// OBJECTS

const usernameInput = document.querySelector('#exampleInputEmail1');
const passwordInput = document.querySelector('#exampleInputPassword1');
const submitButton = document.querySelector('#loginForm');
const logoutButton = document.querySelector('#logout');
const addToForge = document.querySelector('#newTuneForm');
const recentlyAdded = document.querySelector('#recentlyAdded');
const newPlaylistInput = document.querySelector('#newPlaylist');
const createPlaylist = document.querySelector('#createPlaylist');
const playlistAccordian = document.querySelector('#playlistAccordian');
const body = document.body;
const toggleButton = document.getElementById('toggleButton');
const h5 = document.querySelector('h5');
const accordionContainer = document.querySelector('#accordionExample');
const musicNotes = document.querySelector('.notes');
const musicGenre = ['Rock', 'Country', 'Blues', 'Hip-hop', 'Pop', 'Jazz', 'Metal', 'Dubstep', 'Indie rock', 'Reggae', 'Kpop'];
const genreButton = document.querySelector("#generate-genre")

const existingUser = JSON.parse(localStorage.getItem('user')) || [];

const tunes = JSON.parse(localStorage.getItem('tunes')) || [];

let redirectURL = '';

// PAGE DIRECTION

submitButton?.addEventListener('submit', storeSubmission);

logoutButton?.addEventListener('click', function () {
    redirectPage('index.html');
});

// FORGE TUNE FORM

addToForge?.addEventListener('submit', function (event) {
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

    addToForge.reset();
});

// PLAYLIST GENERATOR LOGIC

createPlaylist?.addEventListener('click', function () {
    const playlistName = newPlaylistInput.value.trim();
    if (playlistName === '') return;

    const newAccordionId = `${playlistName}`;

    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion-item');
    accordionItem.style.borderTopWidth = "0px";

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
    ul.innerHTML = '<li>Drag Your Tunes Here!</li>';
    ul.classList.add('accordionListItems');

    someOtherDiv.appendChild(ul);
    someDiv.appendChild(someOtherDiv);
    accordionItem.appendChild(someDiv);
    accordionItem.appendChild(h2);
    accordionContainer.appendChild(accordionItem);

    newPlaylistInput.value = '';

    savePlaylist(playlistName, ul);
    
    listDropEvents(ul);
});

// REDIRECT FUNCTION

const redirectPage = function (url) {
    redirectURL = url;
    location.assign(url);
};

// LOGIN FORM

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

// SESSION STORAGE FOR RECENTLY FORGED TUNES

function storeTune(tune) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || !currentUser.username) return;

    const userForge = `whoa`; /*`${currentUser.username}`;*/
    let tunes = JSON.parse(sessionStorage.getItem(userForge)) || [];
    tunes.push(tune);
    sessionStorage.setItem(userForge, JSON.stringify(tunes));
}

function loadStoredTunes() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || !currentUser.username) return;

    const userForge = `whoa`;
    const tunes = JSON.parse(sessionStorage.getItem(userForge)) || [];
    tunes.forEach(tune => addTuneToList(tune));
}

// RECENTLY FORGED FUNCTIONALITY

function addTuneToList(tune) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const editButton = document.createElement('button');
    const dragButton = document.createElement('button');

    a.href = tune.urlAudio;
    a.target = "_blank";
    a.textContent = `${tune.artistName} - ${tune.songTitle}`;

    editButton.textContent = 'Reforge';
    editButton.classList.add('btn', 'btn-secondary', 'edit-button');
    editButton.style.margin = '10px';

    editButton.addEventListener('click', function () {
        document.querySelector('#editArtistName').value = tune.artistName;
        document.querySelector('#editSongTitle').value = tune.songTitle;
        document.querySelector('#editUrlAudio').value = tune.urlAudio;

        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();

        const editTuneForm = document.getElementById('editTuneForm');
        editTuneForm.onsubmit = function (event) {
            event.preventDefault();

            tune.artistName = document.querySelector('#editArtistName').value;
            tune.songTitle = document.querySelector('#editSongTitle').value;
            tune.urlAudio = document.querySelector('#editUrlAudio').value;

            a.textContent = `${tune.artistName} - ${tune.songTitle}`;
            a.href = tune.urlAudio;

            storeTune(tune);

            editModal.hide();
        };
    });

    dragButton.textContent = 'Drag Tune';
    dragButton.classList.add('btn', 'btn-secondary', 'dragButton');
    dragButton.style.margin = '10px';

    dragButton?.addEventListener('mousedown', function () {
        li.draggable = true;
        li?.addEventListener('dragstart', dragStart);
    });

    dragButton?.addEventListener('mouseup', function () {
        li.draggable = false;
    });

    li.appendChild(dragButton);
    li.appendChild(editButton);
    li.appendChild(a);

    recentlyAdded.appendChild(li);
}

// PLAYLIST LOCAL STORAGE FUNCTIONALITY

function savePlaylist(playlistName, ul) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || !currentUser.username) return;

    const playlistKey = `${currentUser.username}`;
    let playlistsData = JSON.parse(localStorage.getItem(playlistKey)) || {};

    if (!playlistsData[playlistName]) {
        playlistsData[playlistName] = [];
    }

    if (ul) {
        const tunes = Array.from(ul.querySelectorAll('li')).map(li => li.innerHTML);
        playlistsData[playlistName] = tunes;
    }

    localStorage.setItem(playlistKey, JSON.stringify(playlistsData));
}

function loadStoredPlaylists() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser || !currentUser.username) return;
    
    const playlistKey = `${currentUser.username}`;
    const storedPlaylists = JSON.parse(localStorage.getItem(playlistKey)) || {};

    Object.keys(storedPlaylists).forEach(playlistName => {
        createAccordionForPlaylist(playlistName);
    });

    Object.keys(storedPlaylists).forEach(playlistName => {
        const tunes = storedPlaylists[playlistName];
        const ul = document.querySelector(`#${playlistName} ul`);

        if (ul) {
            tunes.forEach(tuneHTML => {
                const li = document.createElement('li');
                li.innerHTML = tuneHTML;
                ul.appendChild(li);
            });
        }
    });
}

// ACCORDION GENERATOR

function createAccordionForPlaylist(playlistName) {
    const newAccordionId = `${playlistName}`;

    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion-item');
    accordionItem.style.borderTopWidth = "0px";

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
    ul.innerHTML = '<li>Drag Your Tunes Here!</li>';
    ul.classList.add('accordionListItems');

    someOtherDiv.appendChild(ul);
    someDiv.appendChild(someOtherDiv);
    accordionItem.appendChild(someDiv);
    accordionItem.appendChild(h2);
    accordionContainer.appendChild(accordionItem);

    listDropEvents(ul);
}

// USERNAME DISPLAY LOGIC

if (existingUser.username) {
    const loggedIn = document.querySelector('.username');
    loggedIn.textContent = `${existingUser.username}`;
}

// TOGGLE BUTTON FUNCTION

let isDarkMode = false;

const savedTheme = 'theme';
if (savedTheme === 'dark') {
    isDarkMode = true;
    body.setAttribute('data-theme', 'dark');
    toggleButton.textContent = 'Switch to Light Mode';
}

function toggleTheme() {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        h5.setAttribute('data-theme', 'dark');
        musicNotes.setAttribute('data-theme', 'dark');
        body.setAttribute('data-theme', 'dark');
        toggleButton.textContent = 'Switch to Light Mode';
    } else {
        body.removeAttribute('data-theme');
        toggleButton.textContent = 'Switch to Dark Mode';
    }
}

toggleButton?.addEventListener('click', toggleTheme);

// DRAG AND DROP FUNCTIONS

function dragStart(event) {
    const linkElement = event.target.querySelector('a');
    if (linkElement) {
        event.dataTransfer.setData('text/plain', linkElement.outerHTML);
    }
}

function listDropEvents(ul) {
    ul?.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    ul?.addEventListener('drop', function (event) {
        event.preventDefault();
        const droppedData = event.dataTransfer.getData('text/plain');

        const accordionListItems = ul.querySelector('li');
        if (accordionListItems) {
            accordionListItems.remove();
        }

        const newLi = document.createElement('li');
        newLi.innerHTML = droppedData;
        ul.appendChild(newLi);

        const playlistName = ul.closest('.accordion-collapse').id;
        savePlaylist(playlistName, ul);
    });
}

// RANDOM GENRE GENERATOR
function getRandomGenre() {

    const randomIndex = Math.floor(Math.random() *musicGenre.length);
    
    return musicGenre[randomIndex];
    }
    
    genreButton?.addEventListener('click', function() {
        const musGenre = getRandomGenre();
        document.getElementById("genre-display").textContent = musGenre;
    });

// CALLS

getRandomGenre();
loadStoredTunes();
loadStoredPlaylists();
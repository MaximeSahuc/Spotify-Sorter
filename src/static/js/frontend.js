var IS_IN_EDIT_MODE = false;
var SHORTCUTS = [];

function updateUserInfos(username, avatar) {
    // document.getElementById('username').innerHTML = username;
    document.getElementById('user-avatar').src = avatar;
}

function updateCurrentTrack(track) {
    if (Object.keys(track).length) {
        CURRENT_TRACK_ID = track.id;

        document.getElementById('track-cover').src = track.image;
        document.getElementById('track-name').innerHTML = track.name;
        document.getElementById('track-author').innerHTML = track.artists;
    }
}

function displayShortcuts() {
    document.getElementById('section-playlist-buttons').innerHTML = '';

    for (let index = 0; index < 15; index++) {
        const name = `Shortcut ${index}`;
        const id = self.crypto.randomUUID();
        const color = getRandomColor();

        SHORTCUTS.push({
            name: name,
            id: id,
            color: color,
            playlists: []
        });

        document.getElementById('section-playlist-buttons').innerHTML +=
            `<button style="background-color: ${color};" class="playlist-button" onclick="shortcutClicked('${id}')" id="${id}">${name}</button>`;
    }

    document.getElementById('section-playlist-buttons').innerHTML += `<button class="playlist-button hidden" id="playlist-button-add-new")"></button>`;
}

function shortcutClicked(id) {
    if (IS_IN_EDIT_MODE) {
        editShortcut(id);
    } else {
        shortcutCallback(id);
    }
}

async function editShortcut(id) {
    overlayOn();
    console.log(`shortcut edit ${id}`);

    const shortcut = SHORTCUTS.find(shortcut => shortcut.id === id);

    // set shortcut name in menu to last saved value
    const shortcutNameElement = document.getElementById('input-shortcut-name');
    shortcutNameElement.value = shortcut.name;
    document.getElementById('btn-save-shortcut').setAttribute('onclick', `saveShortcut("${id}")`);

    // set shortcut color in menu to last saved value
    const shortcutColorElement = document.getElementById('input-shortcut-color');
    shortcutColorElement.value = shortcut.color;

    // display menu
    showElement('edit-shortcut-overlay');

    // display user's playlists
    const availiblePlaylistsContainer = document.getElementById('edit-shortcut-settings-playlists-select');
    var playlists = await getUserPlaylists();

    availiblePlaylistsContainer.innerHTML = '';
    for (playlist of playlists) {
        availiblePlaylistsContainer.innerHTML += createPlaylistElement(playlist.name, playlist.image, playlist.id, isPlaylistSelectedInShortcut(id, playlist.id));
    }
}

function isPlaylistSelectedInShortcut(shortcutId, playlistId) {
    const shortcut = SHORTCUTS.find(shortcut => shortcut.id === shortcutId);
    return shortcut.playlists.includes(playlistId);
}

function saveShortcut(shortcutId) {
    const shortcut = SHORTCUTS.find(shortcut => shortcut.id === shortcutId);
    var selectedPlaylists = [];

    // update selected playlists in local variable
    const availiblePlaylistsContainer = document.getElementById('edit-shortcut-settings-playlists-select');
    for (let child of availiblePlaylistsContainer.children) {
        const selected = child.classList.contains('selected');
        if (selected) {
            selectedPlaylists.push(child.id);
        }
    }

    shortcut.playlists = selectedPlaylists;

    // Update shortcut color in local variable
    const shortcutColor = document.getElementById('input-shortcut-color').value;
    shortcut.color = shortcutColor;

    // update name in local variable
    const shortcutName = document.getElementById('input-shortcut-name').value;
    shortcut.name = shortcutName;

    // Update html
    document.getElementById(shortcutId).innerHTML = shortcutName;
    document.getElementById(shortcutId).style.backgroundColor = shortcutColor;

    // save data server side

    overlayOff();
}

function overlayOn() {
    document.getElementsByTagName('main')[0].style.filter = 'blur(5px)';
}

function overlayOff() {
    document.getElementsByTagName('main')[0].style.filter = '';
    hideElement('edit-shortcut-overlay');
}

function createPlaylistElement(name, image, id, selected) {
    return `<div class="playlists-select-playlist ${selected ? 'selected' : ''}" id="${id}" onclick="togglePlaylistSelect('${id}')">
                <img src="${image}" alt="playlist image" class="select-playlist-image">
                <span class="playlists-select-playlist-name">${name}</span>
                <div class="playlist-select-status shadows"></div>
            </div>`;
}

function togglePlaylistSelect(id) {
    const element = document.getElementById(id);
    if (element.classList.contains('selected')) {
        element.classList.remove('selected')
    } else {
        element.classList.add('selected')
    }
}

function shortcutCallback(id) {
    if (!CURRENT_TRACK_ID)
        return;

    console.log(`shortcut callback ${id}`);
}

function enterEditmode() {
    const shortcuts = document.getElementsByClassName('playlist-button');
    for (let index = 0; index < shortcuts.length; index++) {
        const shortcut = shortcuts[index];
        shortcut.classList.add('playlist-button-edit-mode');
    }

    showElement('playlist-button-add-new');
}

function exitEditmode() {
    const shortcuts = document.getElementsByClassName('playlist-button');
    for (let index = 0; index < shortcuts.length; index++) {
        const shortcut = shortcuts[index];
        shortcut.classList.remove('playlist-button-edit-mode');
    }

    hideElement('playlist-button-add-new');
}

function showElement(elementId) {
    document.getElementById(elementId).classList.remove('hidden');
    document.getElementById(elementId).classList.add('visible');
}

function hideElement(elementId) {
    document.getElementById(elementId).classList.remove('visible');
    document.getElementById(elementId).classList.add('hidden');
}

function toggleEditmode() {
    IS_IN_EDIT_MODE = !IS_IN_EDIT_MODE;

    if (IS_IN_EDIT_MODE) {
        enterEditmode();
    } else {
        exitEditmode();
    }
}
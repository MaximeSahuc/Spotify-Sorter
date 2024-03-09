var IS_IN_EDIT_MODE = false;
var SHORTCUTS = [];

function updateUserInfos(username, avatar) {
    // document.getElementById('username').innerHTML = username;
    document.getElementById('user-avatar').src = avatar;
}

function updateCurrentTrack(track) {
    if (Object.keys(track).length) {
        CURRENT_TRACK_ID = track.id;

        document.getElementById('track-cover').src = track.image.replace('i.scdn.co', 'mosaic.scdn.co');
        document.getElementById('track-name').innerHTML = track.name;
        document.getElementById('track-author').innerHTML = track.artists;
    }
}

function updateShortcuts() {
    document.getElementById('section-shortcuts').innerHTML = '';

    for (shortcut of SHORTCUTS) {
        document.getElementById('section-shortcuts').innerHTML +=
            `<div class="shortcut-btn ${IS_IN_EDIT_MODE ? 'shortcut-btn-edit-mode' : ''}" style="background-color: ${shortcut.color};" onclick="shortcutClicked('${shortcut.id}')" id="${shortcut.id}">
            <div class="shortcut-btn-options">
                <div class="shortcut-btn-option-delete" onclick="deleteShortcut('${shortcut.id}')"></div>
                <div class="shortcut-btn-option-edit" onclick="editShortcut('${shortcut.id}')"></div>
            </div>
            <span class="shortcut-btn-text">${shortcut.name}</span>
        </div>`;
    }

    document.getElementById('section-shortcuts').innerHTML +=
        `<div class="${IS_IN_EDIT_MODE ? '' : 'hidden'}" onclick="createNewShortcut()" id="shortcut-button-add-new"></div>`;

    if (SHORTCUTS.length == 0) {
        IS_IN_EDIT_MODE = true;
        enterEditmode();
    }
}

function deleteShortcut(shortcutId) {
    SHORTCUTS = SHORTCUTS.filter(shortcut => shortcut.id != shortcutId);
    updateShortcuts();

    // save data server side
    saveUserConfig(SHORTCUTS);
}

function createNewShortcut() {
    const name = 'New shortcut';
    const id = self.crypto.randomUUID();
    const color = getRandomColor();

    SHORTCUTS.push({
        name: name,
        id: id,
        color: color,
        playlists: []
    });

    updateShortcuts();

    // save data server side
    saveUserConfig(SHORTCUTS);
}

function shortcutClicked(id) {
    if (!IS_IN_EDIT_MODE)
        shortcutCallback(id);
}

// Add the current track to the shortcut's playlists
function shortcutCallback(shortcutId) {
    if (!CURRENT_TRACK_ID)
        return;

    const shortcut = getShortcut(shortcutId);

    saveTrackToPlaylists(CURRENT_TRACK_ID, shortcut.playlists);
}

var CURRENT_SHORTCUT_ID;
async function editShortcut(shortcutId) {
    CURRENT_SHORTCUT_ID = shortcutId;
    overlayOn();

    const shortcut = getShortcut(shortcutId);

    // set shortcut name in menu to last saved value
    const shortcutNameElement = document.getElementById('input-shortcut-name');
    shortcutNameElement.value = shortcut.name;
    document.getElementById('btn-save-shortcut').setAttribute('onclick', `saveShortcut("${shortcutId}")`);

    // set shortcut color in menu to last saved value
    const shortcutColorElement = document.getElementById('input-shortcut-color');
    shortcutColorElement.value = shortcut.color;

    // display user's playlists
    addPlaylistsToPopup(shortcutId, AVAILIBLE_PLAYLISTS);

    // display menu
    showElement('edit-shortcut-overlay');
}

function addPlaylistsToPopup(shortcutId, playlists) {
    if (!playlists)
        return;

    const availiblePlaylistsContainer = document.getElementById(
      "edit-shortcut-settings-playlists-container"
    );

    availiblePlaylistsContainer.innerHTML = '';

    // Add user's playlists
    for (playlist of playlists) {
        availiblePlaylistsContainer.innerHTML += createPlaylistElement(playlist.name, playlist.image, playlist.id, isPlaylistSelectedInShortcut(shortcutId, playlist.id));
    }
}

function isPlaylistSelectedInShortcut(shortcutId, playlistId) {
    const shortcut = getShortcut(shortcutId);
    return shortcut.playlists.includes(playlistId);
}

function saveShortcut(shortcutId) {
    const shortcut = getShortcut(shortcutId);
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
    document.getElementById(shortcutId).querySelector('span').textContent = shortcutName;
    document.getElementById(shortcutId).style.backgroundColor = shortcutColor;

    // save data server side
    saveUserConfig(SHORTCUTS);

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

    saveUserConfig(SHORTCUTS);
}

function enterEditmode() {
    const shortcuts = document.getElementsByClassName('shortcut-btn');

    if (shortcuts) {
        for (let index = 0; index < shortcuts.length; index++) {
            const shortcut = shortcuts[index];
            shortcut.classList.add('shortcut-btn-edit-mode');
        }
    }

    document.getElementById('button-edit-mode').classList.remove('button-edit-mode-off');
    document.getElementById('button-edit-mode').classList.add('button-edit-mode-on');

    showElement('shortcut-button-add-new');
}

function exitEditmode() {
    const shortcuts = document.getElementsByClassName('shortcut-btn');

    if (shortcuts) {
        for (let index = 0; index < shortcuts.length; index++) {
            const shortcut = shortcuts[index];
            shortcut.classList.remove('shortcut-btn-edit-mode');
        }
    }

    document.getElementById('button-edit-mode').classList.remove('button-edit-mode-on');
    document.getElementById('button-edit-mode').classList.add('button-edit-mode-off');

    hideElement('shortcut-button-add-new');
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

function onPlaylistSearchEvent() {
    const searchbar = document.getElementById('input-search-playlist');
    const text = searchbar.value;
    
    const searchResult = AVAILIBLE_PLAYLISTS.filter(playlist => playlist.name.toLowerCase().includes(text.toLowerCase()));

    addPlaylistsToPopup(CURRENT_SHORTCUT_ID, searchResult);
}

function initFrontend() {
  updateShortcuts();
  loadUserPlaylists();

  document.getElementById('input-search-playlist').addEventListener('input', e => {
    onPlaylistSearchEvent();
  });
}
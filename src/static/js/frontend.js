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
    var html = '';
    for (let index = 0; index < 14; index++) {
        html += `<button style="background-color: ${getRandomColor()};" class="playlist-button")">Shortcut ${index}</button>`
    }

    document.getElementById('section-playlist-buttons').innerHTML = html;
}

function showSettings() {

}

function hideSettings() {

}
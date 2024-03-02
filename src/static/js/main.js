async function update() {
    var user = await getUserData();
    updateUserInfos(user.username, user.avatar);
    updateCurrentTrack(user.now_playing);
}

async function getUserData() {
    var response = await fetch('http://localhost:3000/me');
    switch (response.status) {
        case 200:
            return await response.json();
            break;

        case 401:
            window.location = '/login';
            break;

        default:
            console.error('Cannot login >:(');
            document.getElementById('track-author').innerHTML = `${response.status}: Cannot login >:(`;
            break;
    }
}

function init() {
    displayShortcuts();
}

setInterval(update, 2000); // Update player every 2 seconds
setTimeout(init, 0); // Init function on load
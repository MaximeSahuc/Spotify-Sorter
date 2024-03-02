async function update() {
    var user = await getUserData();
    updateUserInfos(user.username, user.avatar);
    updateCurrentTrack(user.now_playing);
}

function init() {
    displayShortcuts();
}

setInterval(update, 2000); // Update player every 2 seconds
setTimeout(init, 0); // Init function on load
async function update() {
    const user = await getUserData();

    updateUserInfos(user.username, user.avatar);
    updateCurrentTrack(user.now_playing);
}

async function init() {
    const user = await getUserData();
    USER_ID = user.id;

    // load user's config
    const userConfig = await getUserConfig(USER_ID);
    if (userConfig) {
        SHORTCUTS = userConfig;
        console.log('loaded user config');
    }

    updateShortcuts();
    loadUserPlaylists();

    setInterval(update, 2000); // Update player every 2 seconds
}

setTimeout(init, 0); // Init function on load
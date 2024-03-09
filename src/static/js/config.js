async function saveUserConfig(userConfig) {
    const postData = {
        user: USER_ID,
        config: userConfig
    };

    const response = await fetch('/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });

    const status = await response.statusText;
    console.log(`saving config status : ${status}`);
}

async function getUserConfig(userId) {
    const response = await fetch(`/config?user=${userId}`);
    const status = await response.status;

    if (status === 500) {
        console.error('Could not load user config');
        return undefined;
    }

    if (status === 404) {
        return [];
    }

    return response.json();
}

async function loadUserConfig() {
    const userConfig = await getUserConfig(USER_ID);
    if (userConfig) {
        SHORTCUTS = userConfig;
        console.log('loaded user config');
    }
}
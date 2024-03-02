const fs = require('fs');
const path = require('path');

const CONFIG_PATH = '/app/config'

function aaaa() {
    console.log('tetette');
}

function saveUserConfig(userId, userConfig) {
    const filePath = path.join(CONFIG_PATH, `${userId}.json`);

    const jsonData = JSON.stringify(userConfig, null, 2);

    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error(`Failed to save for user ${userId}`, err);
            return;
        }
        console.log(`Saved config for user ${userId}`);
    });
}
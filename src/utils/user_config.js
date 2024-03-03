const fs = require('fs').promises;
const path = require('path');

const configDir = '/app/config';

function saveUserConfig(userId, userConfig) {
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir);
    }

    const userConfigPath = path.join(configDir, `${userId}.json`);

    const jsonData = JSON.stringify(userConfig, null, 2);

    fs.writeFile(userConfigPath, jsonData, (err) => {
        if (err) {
            console.error(`Failed to save for user ${userId}`, err);
            return;
        }
        console.log(`Saved config for user ${userId}`);
    });
}

async function readUserConfig(userId) {
    const userConfigPath = path.join(configDir, `${userId}.json`);

    try {
        const data = await fs.readFile(userConfigPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Failed to read config file for user ${userId}`, error);
        throw error; // Propager l'erreur pour une gestion ultérieure
    }
}

module.exports = { saveUserConfig, readUserConfig };

// const { saveUserConfig } = require('./utils/user_config');
// const { readUserConfig } = require('./utils/user_config');
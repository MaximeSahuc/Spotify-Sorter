require('./config');
require('./services/spotify');

const express = require('express');
const app = express();

const loginRoute = require('./routes/login')
const callbackRoute = require('./routes/callback');
const meRoute = require('./routes/me');
const playlistsRoute = require('./routes/playlists');
const playlistsAddTrackRoute = require('./routes/playlists_add');
const userConfigRoute = require('./routes/user_config');
const saveUserConfigRoute = require('./routes/user_config_save');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));

// Endpoints
app.get('/login', loginRoute);
app.get('/callback', callbackRoute);
app.get('/me', meRoute);
app.get('/playlists', playlistsRoute);
app.post('/playlists', playlistsAddTrackRoute);
app.get('/config', userConfigRoute);
app.post('/config', saveUserConfigRoute);

// SIGTERM - Docker stop
process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    });
});

// SIGINT - Ctrl+C in terminal
process.on('SIGINT', () => {
    server.close(() => {
        process.exit(0);
    });
});

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
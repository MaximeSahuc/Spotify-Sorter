require('./config');
require('./services/spotify');

const express = require('express');
const app = express();

const login = require('./routes/login')
const callback = require('./routes/callback');
const me = require('./routes/me');
const playlists = require('./routes/playlists');
const playlistsAddTrack = require('./routes/playlists_add');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));

// Endpoints
app.get('/login', login);
app.get('/callback', callback);
app.get('/me', me);
app.get('/playlists', playlists);
app.post('/playlists', playlistsAddTrack);

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
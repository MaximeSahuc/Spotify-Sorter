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

// app.get("/", (req, res) => {
//     res.sendFile(`${__dirname}/static/index.html`);
// });

app.listen(PORT, () => console.log('Listening on port 3000'));
require('../services/spotify');

var baseUrl;
module.exports = async (req, res) => {
    // console.log('request to `playlist` endpoint');

    baseUrl = `${req.protocol}://${req.hostname}:${PORT}`;

    var playlists = [
        {
            name: 'Liked Songs',
            id: 'saved_tracks',
            image: '/img/liked-songs.png'
        }
    ];

    var hasNext = true;
    var offset = 0;

    var tmpPlaylistsStartWithLetter = [];
    var tmpPlaylistsStartWithNumOrPunct = [];

    while (hasNext) {
        await spotifyApi.getUserPlaylists({ offset: offset })
            .then(function (data) {
                hasNext = data.body.next != null;
                offset += 20;

                data.body.items.forEach(playlist => {
                    if (playlist.owner.id == USER_ID) {
                        const playlistData = getPlaylistData(playlist);

                        if (startsWithNumOrPunct(playlistData.name)) {
                            tmpPlaylistsStartWithNumOrPunct.push(playlistData);
                        } else {
                            tmpPlaylistsStartWithLetter.push(playlistData);
                        }
                    }
                });

            }, function (err) {
                // console.log('Something went wrong!', err);
                hasNext = false;
            });
    }

    // sort playlists
    tmpPlaylistsStartWithLetter.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    tmpPlaylistsStartWithNumOrPunct.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    playlists.push(...tmpPlaylistsStartWithLetter, ...tmpPlaylistsStartWithNumOrPunct);

    res.type('json');
    res.json({
        playlists: playlists,
        total: playlists.length
    });

};

function getPlaylistData(playlist) {
    return {
        name: playlist.name,
        id: playlist.id,
        image: playlist.images.length != 0 ? playlist.images[0].url : `${baseUrl}/img/default-album-image.png`,
    }
}

function startsWithNumOrPunct(text) {
    const regex = /^(\d|\p{P})/u;
    return regex.test(text);
}
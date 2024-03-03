require('../services/spotify');

var baseUrl;
module.exports = async (req, res) => {
    // console.log('request to `playlist` endpoint');

    baseUrl = `${req.protocol}://${req.hostname}:${PORT}`;

    var playlists = [];
    var hasNext = true;
    var offset = 0;

    while (hasNext) {
        await spotifyApi.getUserPlaylists({ offset: offset })
            .then(function (data) {
                hasNext = data.body.next != null;
                offset += 20;

                data.body.items.forEach(playlist => {
                    if (playlist.owner.id == USER_ID) {
                        playlists.push(getPlaylistData(playlist));
                    }
                });

            }, function (err) {
                // console.log('Something went wrong!', err);
                hasNext = false;
            });
    }

    playlists.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

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
        image: playlist.images.length != 0 ? playlist.images[0].url : `${baseUrl}/img/default_album_image.png`,
        tracks: playlist.tracks.total
    }
}
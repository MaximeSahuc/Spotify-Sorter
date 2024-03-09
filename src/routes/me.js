require('../services/spotify');

module.exports = async (req, res) => {
    // console.log('request to `me` endpoint');
    if (!USER_DISPLAY_NAME) {
        res.sendStatus(401);
        return;
    }

    spotifyApi.getMyCurrentPlayingTrack()
        .then(function (data) {
            const track = data.body.item;

            res.json(track);
            return;
            var artists = '';
            var nowPlaying = {};
            if (track) {
                for (let index = 0; index < track.artists.length; index++) {
                    const artist = track.artists[index].name;
                    artists += artist + (index < track.artists.length - 1 ? ', ' : '');
                }

                nowPlaying = {
                    name: track.name,
                    id: track.id,
                    artists: artists,
                    image: track.album.images[0].url
                }
            }

            res.type('json');
            res.json(
                {
                    username: USER_DISPLAY_NAME,
                    id: USER_ID,
                    avatar: USER_AVATAR,
                    now_playing: nowPlaying
                }
            );

        }, function (err) {
            if (err.statusCode == 401) {
                res.sendStatus(401);
            } else {
                res.send(err);
            }
        });
};
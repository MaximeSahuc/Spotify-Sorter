require('../services/spotify');

module.exports = async (req, res) => {
    // console.log('request to `add track to playlist` endpoint');

    res.type('json');

    const trackId = req.body.track;

    var error = false;
    for (let playlistId of req.body.playlists) {
        if (playlistId == 'saved_tracks') {
            console.log('Trying to add track to saved tracks');
            await addToSavedTracks(trackId);
            continue;
        }

        if (! await isAlreadyInPlaylist(playlistId, trackId)) {
            try {
                await spotifyApi.addTracksToPlaylist(playlistId, [`spotify:track:${trackId}`]);
            } catch (err) {
                error = true;
                res.json(err);
                break;
            }
        }
    }

    if (!error)
        res.send('success');
}

async function isAlreadyInPlaylist(playlistId, trackId) {
    const data = await spotifyApi.getPlaylist(playlistId);
    const entries = data.body.tracks.items;

    if (entries.length == 0) {
        return false;
    }

    for (let entry of entries) {
        if (entry.track.id == trackId) {
            return true;
        }
    }

    return false;
}

async function addToSavedTracks(trackId) {
    const isTrackSavedData = await spotifyApi.containsMySavedTracks([trackId]);
    const isTrackSaved = isTrackSavedData.body[0];

    if (!isTrackSaved) {
        console.log('trying to add to saved tracks');
        spotifyApi.addToMySavedTracks([trackId]).then(data => {
            console.log('Added track to saved tracks');
        }, err => {
            console.log('Error while adding track to saved tracks', err);
        })
    } else {
        console.log('Skipping, track already saved');
    }
}
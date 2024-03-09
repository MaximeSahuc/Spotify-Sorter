var CURRENT_TRACK_ID;
var USER_ID;

var AVAILIBLE_PLAYLISTS;

async function getUserData() {
  var response = await fetch("/me");
  switch (response.status) {
    case 200:
      return await response.json();
      break;

    case 401:
      window.location = "/login";
      break;

    default:
      console.error("Cannot login >:(");
      document.getElementById(
        "track-author"
      ).innerHTML = `${response.status}: Cannot login >:(`;
      break;
  }
}

async function getUserPlaylists() {
  const response = await fetch("/playlists");
  const data = await response.json();

  return data.playlists;
}

async function saveTrackToPlaylists(trackId, toPlaylists) {
  const postData = {
    track: trackId,
    playlists: toPlaylists,
  };

  const response = await fetch("/playlists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  const status = await response.status;
  if (status != 200) console.log(`saving track status : ${status}`);
}

async function loadUserPlaylists() {
  AVAILIBLE_PLAYLISTS = await getUserPlaylists();
  addPlaylistsToPopup(CURRENT_SHORTCUT_ID, AVAILIBLE_PLAYLISTS);
}
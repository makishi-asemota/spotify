import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export function TrackTitles({ searchedSongTitle, songOnClick }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="searchSong">
        <Stack gap={3}>
          {searchedSongTitle?.map((song) => (
            <div
              key={song.id}
              className="d-flex justify-content-between align-items-center searchedSongTitle"
              onClick={() => {
                songOnClick(song.id);
              }}
            >
              <img src={song.album.images[2].url} alt="albumcover"></img>
              <p className="fw-bold">{song.name}</p>
              <p className="fw-bold">{song.artists[0].name}</p>
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
}

export function TrackRecommendations({
  songRecommendations,
  createPlaylistPage,
}) {
  return (
    <div className="d-flex justify-content-center">
      <div className="trackPlayer">
        <p className="fw-bold fs-3">Recommended Songs</p>
        <Stack gap={3}>
          {songRecommendations?.map((song) => (
            <div
              key={song.id}
              className="d-flex flex-column align-items-center songTitle"
            >
              <a href={song.external_urls.spotify} className="albumCover">
                <img
                  src={song.album.images[0].url}
                  className="albumCover"
                  alt="albumcover"
                ></img>
              </a>
              <div className="audioPlayer text-center">
                <p className="fw-bold recommendName">{song.name}</p>
                <p className="fw-bold recommendArtist">
                  {song.artists[0].name}
                </p>
                <AudioPlayer src={song.preview_url} />
              </div>
            </div>
          ))}
        </Stack>
        <br></br>
        <div className="text-center">
          <Button
            variant="success"
            size="lg"
            onClick={createPlaylistPage}
            className="makePlaylist"
          >
            Make a playlist
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CreatePlaylist({
  setPlaylistName,
  setPlaylistDescription,
  if_public,
  setIf_Public,
  generatePlaylist,
  createdPlaylist,
  playlist,
}) {
  return (
    <div className="d-flex flex-column align-items-center">
      <p className="fw-bold fs-1 text-center">Create New Playlist</p>
      <div className="playlistForm">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="input"
              placeholder="Playlist Name"
              name="name"
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Playlist Description"
              name="description"
              onChange={(e) => {
                setPlaylistDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              checked={if_public}
              label="Public"
              onChange={(e) => {
                setIf_Public(e.target.checked);
              }}
            />
          </Form.Group>
          <Form.Group className="text-center">
            <Button
              variant="outline-success"
              type="submit"
              onClick={(e) => generatePlaylist(e)}
            >
              Create Playlist
            </Button>
          </Form.Group>
        </Form>

        {createdPlaylist ? (
          <div className="text-center goToPlaylist">
            <a
              href={playlist?.external_urls.spotify}
              className="btn btn-lg btn-success btn-m active"
              role="button"
              aria-pressed="true"
            >
              Go to Playlist
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export function Empty() {
  return (
    <p className="fs-2 text-center">Enter the title of your favorite song!</p>
  );
}

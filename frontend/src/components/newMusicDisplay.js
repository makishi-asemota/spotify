import Stack from "react-bootstrap/Stack";
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

export function TrackRecommendations({ songRecommendations }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="recommendSong">
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
              <div className="audioPlayer">
                <p className="fw-bold recommendName">{song.name}</p>
                <p className="fw-bold recommendArtist">
                  {song.artists[0].name}
                </p>
                <AudioPlayer src={song.preview_url} />
              </div>
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
}

export function Empty() {
  return <p className="fs-2">Enter the title of your favorite song!</p>;
}

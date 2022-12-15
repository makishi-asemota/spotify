import Stack from "react-bootstrap/Stack";
import "bootstrap/dist/css/bootstrap.css";

export function TrackTitles({ searchedSongTitle, songOnClick }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="" style={{ width: "60vw" }}>
        <Stack gap={3}>
          {searchedSongTitle?.map((song) => (
            <div
              key={song.id}
              className="d-flex justify-content-between align-items-center songTitle"
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
      <div className="" style={{ width: "60vw" }}>
        <p className="fs-3">Recommended Songs</p>
        {/* <Stack gap={3}>
          {songRecommendations.map((song) => (
            <div
              key={song.id}
              className="d-flex justify-content-between align-items-center songTitle"
            >
              <img src={song.album.images[2].url} alt="albumcover"></img>
              <p className="fw-bold">{song.name}</p>
              <p className="fw-bold">{song.artists[0].name}</p>
            </div>
          ))}
        </Stack> */}
      </div>
    </div>
  );
}

export function Empty() {
  return <p className="fs-2">Enter the title of your favorite song!</p>;
}

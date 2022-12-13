import { useState, useEffect } from "react";
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopSongs,
} from "../spotify";
import { logout } from "../spotify";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topSongs, setTopSongs] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    const fetchPlaylists = async () => {
      const { data } = await getCurrentUserPlaylists();
      setPlaylists(data);
    };

    const fetchTopArtists = async () => {
      const { data } = await getTopArtists();
      setTopArtists(data);
    };

    const fetchTopSongs = async () => {
      const { data } = await getTopSongs();
      setTopSongs(data);
    };

    fetchProfile();
    fetchPlaylists();
    fetchTopArtists();
    fetchTopSongs();
  }, []);

  let topFiveArtists = topArtists?.items.slice(0, 5);
  let topFiveSongs = topSongs?.items.slice(0, 5);
  let topFivePlaylists = playlists?.items.slice(2, 7);
  console.log(topFiveSongs);

  return (
    <>
      <Stack gap={3}>
        <div className="d-flex align-items-center justify-content-around top">
          <img
            className="rounded-circle profileImage"
            src={profile?.images[0].url}
            alt="Avatar"
          />
          <div>
            <h1 className="fw-bold">{profile?.id}</h1>
            <div className="d-flex justify-content-between">
              <p>{profile?.followers.total} Followers</p>
              <p>{playlists?.total} Public Playlists</p>
            </div>
          </div>
          <a
            href="/newMusic"
            class="btn btn-success btn-m active"
            role="button"
            aria-pressed="true"
          >
            Find New Music
          </a>
          <Button
            variant="outline-danger"
            className="rounded-pill"
            onClick={logout}
          >
            Logout
          </Button>{" "}
        </div>

        <div className="topArtists">
          <h2>Top Artists</h2>
          <div>
            <div className="d-flex justify-content-between">
              {topFiveArtists?.map((artist, idx) => (
                <div>
                  <Card style={{ width: "18vw" }} className="card">
                    <Card.Img
                      variant="top"
                      src={artist.images[0].url}
                      className="rounded-circle cardTop"
                    />
                    <Card.Body className="cardBody">
                      <Card.Title>{artist.name}</Card.Title>
                      <Card.Text>Artist</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="topSongs">
          <h2>Top Songs</h2>
          <div>
            {topFiveSongs?.map((song, idx) => (
              <div className="d-flex justify-content-around align-items-center songs">
                <img alt="albumCover" src={song.album.images[2].url}></img>
                <div className="d-flex flex-column justify-content-between">
                  <p>{song.name}</p>
                  <p class="fw-lighter">{song.album.artists[0].name}</p>
                </div>
                <p>{song.album.name}</p>
                <audio controls autoplay name="media">
                  <source src={song.preview_url} type="audio/mpeg"></source>
                </audio>
                {/* <button onClick={toggle(song.preview_url)}>Play</button> */}
              </div>
            ))}
          </div>
        </div>

        <div className="publicPlaylists">
          <h2>Public Playlists</h2>
          <div className="d-flex justify-content-between">
            {topFivePlaylists?.map((playlist, idx) => (
              <div>
                <Card style={{ width: "18vw" }} className="card">
                  <a href={playlist.external_urls.spotify}>
                    <Card.Img
                      variant="top"
                      src={playlist.images[0].url}
                      className="cardTop playlistPic"
                    />
                  </a>
                  <Card.Body className="cardBody">
                    <Card.Title>{playlist.name}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Stack>
    </>
  );
}

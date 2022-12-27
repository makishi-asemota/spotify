import { useState, useEffect } from "react";
import {
  getCurrentUserPlaylists,
  getTopArtists,
  getTopSongs,
} from "../spotify";
import { logout } from "../spotify";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Profile({ profile }) {
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topSongs, setTopSongs] = useState(null);

  useEffect(() => {
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

    fetchPlaylists();
    fetchTopArtists();
    fetchTopSongs();
  }, []);

  let topFiveArtists = topArtists?.items.slice(0, 6);
  let topFiveSongs = topSongs?.items.slice(0, 6);
  let topFivePlaylists = playlists?.items.slice(0, 6);
  console.log(topFivePlaylists);

  return (
    <>
      <Stack gap={3}>
        <div className="d-md-flex align-items-md-center justify-content-md-around top">
          <img
            className="rounded-circle profileImage"
            src={profile?.images[0].url}
            alt="Avatar"
          />
          <div>
            <h1 className="fw-bold">{profile?.id}</h1>
            <div className="d-flex justify-content-around d-md-flex justify-content-md-between">
              <p>{profile?.followers.total} Followers</p>
              <p>{playlists?.total} Public Playlists</p>
            </div>
          </div>
          <div className="d-flex justify-content-around flex-md-column gap-md-3">
            <a
              href="/newMusic"
              className="btn btn-success btn-m active"
              role="button"
              aria-pressed="true"
            >
              Find New Music
            </a>
            <Button
              variant="outline-danger"
              className="rounded-pill logout"
              onClick={logout}
            >
              Logout
            </Button>{" "}
          </div>
        </div>

        <div className="topArtists">
          <h2 className="fw-bold fs-1 text-center">Top Artists</h2>
          <br></br>
          <Row xs={2} md={3} className="g-4 justify-content-center">
            {topFiveArtists?.map((artist, idx) => (
              <Col className="d-flex justify-content-center">
                <Card className="card">
                  <Card.Img
                    variant="top"
                    src={artist.images[0].url}
                    className="cardTop"
                  />
                  <Card.Body className="cardBody text-center">
                    <Card.Title>{artist.name}</Card.Title>
                    <Card.Text>Artist</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className="d-flex justify-content-center topSongs">
          <div>
            <h2 className="fw-bold fs-1 text-center">Top Songs</h2>
            <br></br>
            <Row xs={1} md={2} className="g-4 justify-content-around">
              {topFiveSongs?.map((song, idx) => (
                <Col>
                  <div className="d-flex flex-column align-items-center gap-1 justify-content-lg-around bg-dark songTitle">
                    <img
                      alt="albumCover"
                      className="albumCover"
                      src={song.album.images[0].url}
                    ></img>
                    <div className="audioPlayer text-center">
                      <p>{song.name}</p>
                      <p class="fw-lighter">{song.album.artists[0].name}</p>
                      <AudioPlayer src={song.preview_url} />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        <div className="publicPlaylists">
          <h2 className="fw-bold fs-1 text-center">Public Playlists</h2>
          <br></br>
          <Row xs={3} className="g-4 justify-content-center">
            {topFivePlaylists?.map((playlist, idx) => (
              <Col className="d-flex justify-content-center">
                <Card className="playlistCard">
                  <Card.Img
                    variant="top"
                    src={playlist.images[0].url}
                    className="cardTop playlistPic"
                  />

                  <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                    <Card.Title>
                      <a
                        href={playlist.external_urls.spotify}
                        className="link-light playlistTitle"
                      >
                        {playlist.name}
                      </a>
                    </Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Stack>
    </>
  );
}

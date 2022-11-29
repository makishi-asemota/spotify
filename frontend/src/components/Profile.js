import { useState, useEffect } from "react";
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
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
  const [open, setOpen] = useState(false);

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

    fetchProfile();
    fetchPlaylists();
    fetchTopArtists();
  }, []);

  console.log(topArtists);
  // let allArtists = topArtists?.items?.slice(0, 10);
  let topFiveArtists = topArtists?.items.slice(0, 5);

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
            <div className="d-flex justify-content-evenly">
              <p>{profile?.followers.total} Followers</p>
              <p>{playlists?.total} Public Playlists</p>
            </div>
          </div>
          <Button
            variant="outline-success"
            className="rounded-pill"
            onClick={logout}
          >
            Logout
          </Button>{" "}
        </div>

        <div className="topArtists">
          <h2>Top Artists</h2>
          <div>
            <div className="d-flex justify-content-evenly">
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
      </Stack>
    </>
  );
}

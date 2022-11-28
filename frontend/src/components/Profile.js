import { useState, useEffect } from "react";
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
} from "../spotify";
import { logout } from "../spotify";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);

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

  let artistArray = topArtists.items.slice(0, 10);

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
            <p>{profile?.followers.total} Followers</p>
            <p>{playlists?.total} Public Playlists</p>
          </div>
          <Button
            variant="outline-success"
            className="rounded-pill"
            onClick={logout}
          >
            Logout
          </Button>{" "}
        </div>

        <div>
          <h2>Top Artists</h2>
          <div className="d-flex">
            {artistArray.map((artist, idx) => (
              <div>
                <img
                  className="topArtists"
                  src={artist.images[0].url}
                  alt="topArtist"
                ></img>
              </div>
            ))}
          </div>
        </div>
      </Stack>
    </>
  );
}

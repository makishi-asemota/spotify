import { useState, useEffect } from "react";
import { getCurrentUserProfile, getCurrentUserPlaylists } from "../spotify";
import { logout } from "../spotify";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Stack gap={3}>
        <div className="d-flex align-items-center justify-content-around top">
          <img
            className="rounded-circle profileImage"
            src={profile.images[0].url}
            alt="Avatar"
          />
          <div>
            <h1 className="fw-bold">{profile.id}</h1>
            <p>{profile.followers.total} Followers</p>
            <p>{playlists.total} Playlists</p>
          </div>
          <Button
            variant="outline-success"
            className="rounded-pill"
            onClick={logout}
          >
            Logout
          </Button>{" "}
        </div>
      </Stack>
    </>
  );
}
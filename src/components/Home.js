import { useEffect, useState } from "react";
import axios from "axios";

export default function Home({ user, logout, token }) {
  const [topArtists, setTopArtists] = useState([]);
  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        let time_range = "short_term";
        const { data } = await axios.get(
          `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTopArtists(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopArtists();
  }, []);

  return (
    <>
      <button onClick={logout}>Logout</button>
      {user && (
        <div>
          <img src={user.images[0].url} alt="profileImage"></img>
          <h1>Welcome {user.id}</h1>
          <div></div>
        </div>
      )}
    </>
  );
}

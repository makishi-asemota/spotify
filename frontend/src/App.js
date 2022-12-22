import { useState, useEffect } from "react";
import { accessToken, getCurrentUserProfile } from "./spotify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import New from "./components/newMusic";
import Profile from "./components/Profile";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const LOGIN_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8888/login"
      : "https://spotifycompanion.herokuapp.com/login";

  useEffect(() => {
    setToken(accessToken);

    const fetchProfile = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <div
            style={{ height: "100vh" }}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <img
              src="https://play-lh.googleusercontent.com/P2VMEenhpIsubG2oWbvuLGrs0GyyzLiDosGTg8bi8htRXg9Uf0eUtHiUjC28p1jgHzo"
              alt="spotify"
              className="spotifyLogo"
            ></img>
            <h1 className="fw-bold">Welcome to your Spotify Companion App</h1>
            <p className="fw-bold">
              Track your favorite artists and songs, discover new music, and
              more!
            </p>
            <br></br>
            <a
              className="btn btn-success btn-m active"
              role="button"
              aria-pressed="true"
              href={LOGIN_URI}
            >
              Login to Spotify
            </a>
          </div>
        ) : (
          <>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Profile profile={profile} setProfile={setProfile} />
                  }
                />
                <Route path="/newMusic" element={<New profile={profile} />} />
              </Routes>
            </BrowserRouter>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

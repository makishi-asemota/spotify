import { useState, useEffect } from "react";
import { accessToken } from "./spotify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import New from "./components/newMusic";
import Profile from "./components/Profile";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
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
              href="http://localhost:8888/login"
            >
              Login to Spotify
            </a>
          </div>
        ) : (
          <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/newMusic" element={<New />} />
              </Routes>
            </BrowserRouter>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

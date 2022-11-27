import { useState, useEffect } from "react";
import { accessToken, getCurrentUserProfile } from "./spotify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import New from "./components/newMusic";
import Profile from "./components/Profile";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    // set current user profile
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
            Log in to Spotify
          </a>
        ) : (
          <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Profile profile={profile} />} />
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

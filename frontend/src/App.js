import { useState, useEffect } from "react";
import { accessToken } from "./spotify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import New from "./components/newMusic";
import Profile from "./components/Profile";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
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

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  searchSongs,
  getRecommendations,
  createPlaylist,
  addToPlaylist,
} from "../spotify";
import {
  TrackTitles,
  TrackRecommendations,
  CreatePlaylist,
  Empty,
} from "./newMusicDisplay";
import "bootstrap/dist/css/bootstrap.css";

export default function New({ profile }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [playlist, setPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [if_public, setIf_Public] = useState(false);
  const [createdPlaylist, setCreatedPlaylist] = useState(false);
  const [state, setState] = useState({
    searchedSong: [],
    searchedSongTitle: null,
    songRecommendations: null,
  });

  // search spotify for entered track name
  async function searchTracks(e) {
    e.preventDefault();
    const { data } = await searchSongs(searchTerm);
    console.log(data.tracks.items);
    setState({ ...state, searchedSongTitle: data.tracks.items });
  }

  // show recommended song after click on searched song
  const songOnClick = async (id) => {
    const selectedSong = state.searchedSongTitle.find((song) => song.id === id);

    const artistId = selectedSong?.artists[0].id;
    const trackId = selectedSong?.id;

    const { data } = await getRecommendations(artistId, trackId);

    setState({
      searchedSong: selectedSong,
      searchedSongTitle: selectedSong,
      songRecommendations: data.tracks,
    });
  };

  // render playlist page
  const createPlaylistPage = () => {
    setPlaylistSongs(state.songRecommendations);
    state.songRecommendations = null;
    console.log(profile.id);
  };

  async function generatePlaylist(e) {
    e.preventDefault();
    // create playlist
    const user_id = profile?.id;
    const name = playlistName;
    const description = playlistDescription;
    const playlistPublic = if_public;
    const { data } = await createPlaylist(
      user_id,
      name,
      description,
      playlistPublic
    );
    setPlaylist(data);
    console.log(playlist);

    // add songs to playlist
    const playlistId = playlist?.id;
    playlistSongs.forEach((song) => {
      const uri = song.uri;
      addToPlaylist(playlistId, uri);
    });

    setCreatedPlaylist(true);
  }

  let displayModule;
  if (state.searchedSongTitle) {
    if (state.searchedSongTitle.length > 1) {
      displayModule = (
        <TrackTitles
          searchedSongTitle={state.searchedSongTitle}
          songOnClick={songOnClick}
        />
      );
    } else if (state.songRecommendations) {
      displayModule = (
        <TrackRecommendations
          songRecommendations={state.songRecommendations}
          createPlaylistPage={createPlaylistPage}
        />
      );
    } else if (playlistSongs) {
      displayModule = (
        <CreatePlaylist
          setPlaylistName={setPlaylistName}
          setPlaylistDescription={setPlaylistDescription}
          if_public={if_public}
          setIf_Public={setIf_Public}
          generatePlaylist={generatePlaylist}
          createdPlaylist={createdPlaylist}
          playlist={playlist}
        />
      );
    }
  } else {
    displayModule = <Empty />;
  }

  return (
    <>
      <Navbar bg="secondary" expand="md" variant="dark">
        <Container>
          <Navbar.Brand className="fw-bold fs-2">Find New Music</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Form className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Search song title"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <Button
                  variant="success"
                  type="submit"
                  onClick={(e) => searchTracks(e)}
                >
                  Search
                </Button>
              </Form>
            </Nav>

            <Nav>
              <Nav.Link className="fw-bold" href="/">
                Return to my Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br></br>

      {displayModule}
    </>
  );
}

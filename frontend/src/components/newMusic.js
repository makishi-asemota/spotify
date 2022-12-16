import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { searchSongs, getRecommendations } from "../spotify";
import { TrackTitles, TrackRecommendations, Empty } from "./newMusicDisplay";
import "bootstrap/dist/css/bootstrap.css";

export default function New() {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState({
    searchedSong: [],
    searchedSongTitle: null,
    songRecommendations: null,
  });

  async function searchTracks(e) {
    e.preventDefault();
    const { data } = await searchSongs(searchTerm);
    setState({ ...state, searchedSongTitle: data.tracks.items });
  }

  const songOnClick = async (id) => {
    const selectedSong = state.searchedSongTitle.find((song) => song.id === id);
    console.log(selectedSong);

    const artistId = selectedSong?.artists[0].id;
    const trackId = selectedSong?.id;

    const { data } = await getRecommendations(artistId, trackId);

    setState({
      searchedSong: selectedSong,
      searchedSongTitle: selectedSong,
      songRecommendations: data.tracks,
    });
    console.log(state.songRecommendations);
  };

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
        <TrackRecommendations songRecommendations={state.songRecommendations} />
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

import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import { searchSongs } from "../spotify";
import "bootstrap/dist/css/bootstrap.css";
export default function New() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedSong, setSearchedSong] = useState(null);
  const [searchedSongTitle, setSearchedSongTitle] = useState(null);

  async function searchTracks(e) {
    e.preventDefault();
    const { data } = await searchSongs(searchTerm);
    setSearchedSongTitle(data.tracks.items);
    console.log(searchedSongTitle);
  }

  const songOnClick = (id) => {
    const selectedSong = searchedSongTitle.find((song) => song.id === id);
    setSearchedSong(selectedSong);
    console.log(searchedSong);
  };

  return (
    <>
      <Navbar bg="secondary" variant="dark" style={{ height: "14vh" }}>
        <Container>
          <Navbar.Brand className="fw-bold fs-2">Find New Music</Navbar.Brand>
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
            <Button variant="success" type="submit" onClick={searchTracks}>
              Search
            </Button>
          </Form>
          <Nav className="justify-content-end">
            <Nav.Link className="fw-bold" href="/">
              Return to my Profile
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br></br>
      <div className="d-flex justify-content-center">
        <div className="" style={{ width: "60vw" }}>
          {searchedSongTitle ? (
            <Stack gap={3}>
              {searchedSongTitle.map((song) => (
                <div
                  key={song.id}
                  className="d-flex justify-content-between align-items-center songTitle"
                  onClick={() => songOnClick(song.id)}
                >
                  <img src={song.album.images[2].url} alt="albumcover"></img>
                  <p className="fw-bold">{song.name}</p>
                  <p className="fw-bold">{song.artists[0].name}</p>
                </div>
              ))}
            </Stack>
          ) : (
            <p>empty</p>
          )}
        </div>
      </div>
    </>
  );
}

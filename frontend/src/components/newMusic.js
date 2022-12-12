import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { searchSongs } from "../spotify";
import "bootstrap/dist/css/bootstrap.css";
export default function New() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedSong, setSearchedSong] = useState(null);

  async function searchTracks() {
    const { data } = await searchSongs(searchTerm);
    setSearchedSong(data);
    console.log(searchedSong);
  }

  return (
    <>
      <Navbar bg="secondary" variant="dark" style={{ height: "12vh" }}>
        <Container>
          <Navbar.Brand className="fw-bold fs-2">Find New Music</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link className="fw-bold" href="/">
              Return to my Profile
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br></br>

      <div className="d-flex justify-content-center">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-success" onClick={searchTracks}>
            Search
          </Button>
        </Form>
      </div>
    </>
  );
}

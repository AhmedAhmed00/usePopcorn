import Navbar from "./Navbar";
import Main from "./Main";
import { useRef, useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NumResaults from "./NumResaults";
import { Box } from "./ListBox";
import MovieList from "./MovieList";
import { WatchedMoviesList } from "./WatchedMoviesList";
import WatchedSummry from "./WatchedSummry";
import { ErorrMessage } from "./ErorrMessage";
import { SelectedMovie } from "./SelectedMovie";
import { useMovies } from "./Hooks/useMovies";
import { useLocalStorageState } from "./Hooks/useLocalStorage";

export const API_KEY = "3c7f82f8";


export default function App() {
  const [selectedId, setSelecteId] = useState(null);
  const [rating, setRating] = useState(0);
  const [query, setQuery] = useState("inception");
  const countRef = useRef(0);
  const { movies, isLoading, error, setIsLoading } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
    localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    handleCloseBtn();
  }
  function handleDeleteMovie(movieId) {
    let newArr = watched.filter((w) => w.imdbId !== movieId);
    setWatched(newArr);
  }

  function handleSelectedId(id) {
    setSelecteId((selected) => (id === selected ? null : id));
  }
  function handleCloseBtn() {
    setSelecteId(null);
  }




  return (
    <>
      <Navbar movies={movies}>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResaults movies={movies} />
      </Navbar>



      <Main movies={movies}>
        <Box>
          {error ? (
            <ErorrMessage message={error} />
          ) : (
            <MovieList
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              movies={movies}
              handleSelectedId={handleSelectedId}
            />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie
              countRef={countRef}
              rating={rating}
              setRating={setRating}
              watched={watched}
              onCloseMovie={handleSelectedId}
              selectedId={selectedId}
              onAddWatch={handleAddWatch}
              handleCloseBtn={handleAddWatch}
            />
          ) : (
            <>
              <WatchedSummry watched={watched} />
              <WatchedMoviesList
                onDeleteMovie={handleDeleteMovie}
                watched={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </>










  );
}

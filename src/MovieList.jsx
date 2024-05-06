import { Movie } from "./Movie";

export default function MovieList({ movies, isLoading, handleSelectedId, onDeleteMovie }) {
  return (
    <>
      {isLoading ? (
        <h2 className="loader">Loading...</h2>
      ) : (
        <ul className="list list-movies">
          {movies?.map((movie, i) => (
            <Movie key={i} onDeleteMovie={onDeleteMovie} handleSelectedId={handleSelectedId} movie={movie} />
          ))}
        </ul>
      )}
    </>
  );
}

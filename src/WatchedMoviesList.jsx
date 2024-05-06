import { WatchedMovie } from "./WatchedMovie";

export function WatchedMoviesList({ watched, onDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie, i) => (
        <WatchedMovie onDeleteMovie={onDeleteMovie} key={i} movie={movie} />
      ))}
    </ul>
  );
}

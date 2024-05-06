export function WatchedMovie({ movie, onDeleteMovie }) {
  return (
    <li key={movie.imdbId}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
        <button
          onClick={() => {
            onDeleteMovie(movie.imdbId);
          }}
          className="btn-delete"
        >
          X
        </button>
      </div>
    </li>
  );
}

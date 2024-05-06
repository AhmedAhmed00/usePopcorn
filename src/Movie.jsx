export function Movie({ movie, handleSelectedId }) {
  return (
    <li onClick={() => handleSelectedId(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} className="poster" alt={`${movie.Title} `} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>

      </div>
    </li>
  );
}






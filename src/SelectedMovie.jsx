import { useEffect, useState } from "react";
import { API_KEY } from "./App";
import StarRating from "./StarRating";
import { ErorrMessage } from "./ErorrMessage";
import { useKey } from "./Hooks/useKey";

export function SelectedMovie({
  selectedId,
  onCloseMovie,
  onAddWatch,
  watched,
  rating,
  setRating,
  countRef,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {

    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
  } = movie;

  const isExist = watched.map((movie) => movie.imdbId).includes(selectedId);

  useEffect(() => {
    console.log("every time movei chave");
  }, [movie]);

  useEffect(() => {
    async function fetchSelectedMovie() {
      try {
        setIsLoading(true);
        setError("");
        let res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        if (!res.ok) throw new Error("there is an error");
        let fetchedMovie = await res.json();
        setMovie(fetchedMovie);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSelectedMovie();
  }, [selectedId, imdbRating]);

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    if (!Title) return;
    document.title = Title;
    return () => {
      document.title = "usePopcorn";
      console.log(`Clean Up effect for movie ${Title}`);
    };
  }, [Title]);



  function handleAdd() {
    const newMovieWatched = {
      imdbId: selectedId,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ").at(0)),
      userRating: rating,
      counter: countRef.current,
    };
    if (!isExist) {
      onAddWatch(newMovieWatched);
      setRating(0);
    }
  }

  return (
    <>
      {error ? (
        <ErorrMessage message={error} />
      ) : (
        <>
          <div className="detail">
            {isLoading ? (
              <div className="loader">Loading....</div>
            ) : (
              <>
                <header>
                  <button className="btn-back" onClick={() => onCloseMovie()}>
                    &larr;
                  </button>
                  <img src={Poster} alt="poster" />
                  <div className="details-overview">
                    <h2>{Title}</h2>
                    <p>
                      {Released} &bull; {Runtime}
                    </p>
                    <p>
                      <span>✌ {imdbRating} Imdb Rating</span>
                    </p>
                  </div>
                </header>
                <div className="rating">
                  <StarRating
                    countRef={countRef}
                    rating={rating}
                    setRating={setRating}
                    maxRating={10}
                    color="yellow"
                    size={30}
                  />
                </div>

                <div className="details">  <section >
                  <button onClick={handleAdd} className="btn-add">
                    + add to list
                  </button>
                  <p>
                    <div className="details-overview">
                      <h2>{Title}</h2>
                      <em>{Plot}</em>
                      <p>Starring {Actors}</p>
                      <p>Director : {Director}</p>

                    </div>

                  </p>
                </section>
                </div>

              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

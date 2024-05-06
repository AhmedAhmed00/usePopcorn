import { useEffect, useState } from "react";
import { API_KEY } from "./../App";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getMoviesSearch() {
      try {
        setIsLoading(true);
        setError("");
        let res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );


        let movies = await res.json();
        if (!res.ok) throw new Error("Somthing went wrong");
        if (query.length < 3) {
          setMovies([]);
          return;
        }
        if (movies.Response === "False") throw new Error("Movie Not Found");

        setMovies(movies.Search);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesSearch();



    return () => {
      controller.abort();
      console.log("iam out");
    };
  }, [query]);

  return { movies, isLoading, error, setIsLoading };
}

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import Data from "../db.json";

function Pagination() {
  const [movies, setMovies] = useState(Data.movies);

  useEffect(() => {
    fetch("http://localhost:5175/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const moviesPerPage = 4;
  const indefOfFirstMovie = (currentPage - 1) * moviesPerPage;
  const indefOfLastMovie = currentPage * moviesPerPage;
  const slicedMovies = movies.slice(indefOfFirstMovie, indefOfLastMovie);
  const numberOfPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  }

  window.scrollTo(0, 0);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Filmlər</h1>
      <div className="row">
        {slicedMovies.map((movie) => (
          <div key={movie.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm">
              <img src={movie.img} className="card-img-top" alt={movie.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">İl: {movie.year}</p>
                <button className="btn btn-primary">Daha ətraflı</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination d-flex justify-content-center align-items-center my-5 gap-3">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-primary">Previous</button>
        <span>{currentPage} of {numberOfPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === numberOfPages} className="btn btn-primary">Next</button>
      </div>
    </div>
  );
}

export default Pagination;

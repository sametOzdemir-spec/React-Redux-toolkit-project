import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemAction,
  fetchItemsAction,
  movieSelector,
  loadingSelector,
} from "./movieSlice";
const Movie = () => {
  const items = useSelector(movieSelector);
  const loading = useSelector(loadingSelector);

  const dispatch = useDispatch();

  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState(0);
  const [duration, setDuration] = useState("");

  const [search, setSearch] = useState("");

  const addMovieItem = useCallback(() => {
    if (!loading) {
      dispatch(addItemAction({ movie, rating, duration }));
      setMovie("");
      setRating(0);
      setDuration("");
    }
  });

  const getItems = useCallback(() => {
    dispatch(fetchItemsAction());
  }, [dispatch]);

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="movie">
      <div className="movie-form">
        <h2>Rate your favorite movies</h2>
        <div className="form-group">
          <label>Movie</label>
          <input
            onChange={(e) => {
              setMovie(e.target.value);
            }}
            value={movie}
            placeholder="Type movie name"
          />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            onChange={(e) => {
              setRating(e.target.value);
            }}
            value={rating}
            placeholder="Set rating"
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            value={duration}
            placeholder="Type duration"
          />
        </div>
        <button
          className={`submit ${loading ? "disable" : ""}`}
          onClick={addMovieItem}
        >
          Submit
        </button>
        <div className="form-group">
          <label>Search</label>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            placeholder="Type search text"
          />
        </div>
      </div>
      <div className="movie-content">
        <table>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Rating</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr style={{ width: "100%", textAlign: "center" }}>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
            {!loading &&
              items.length > 0 &&
              items.filter(
                (item) =>
                  item.movie.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                  search === ""
              ).length > 0 &&
              items
                .filter(
                  (item) =>
                    item.movie.toLowerCase().indexOf(search.toLowerCase()) >
                      -1 || search === ""
                )
                .map((item, index) => (
                  <tr key={`table-${index}`}>
                    <td>{item.movie}</td>
                    <td>{item.rating}</td>
                    <td>{item.duration}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Movie;

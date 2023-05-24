import React from "react";

function GridComponent({ movies }) {
    return (
        <div className="grid-container">
            {movies.map((movie) => (
                <div key={movie.id} className="grid-item">
                    <img src={movie.poster_path} alt={movie.name} />
                    <h3>{movie.name}</h3>
                    <p>{movie.overview}</p>
                </div>
            ))}
        </div>
    );
}

export default GridComponent;

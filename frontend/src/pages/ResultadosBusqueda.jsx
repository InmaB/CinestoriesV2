import React from "react";
import { useSelector } from "react-redux";

const ResultadosBusqueda = () => {

    const searchResults = useSelector((state) => state.cinestories.movies)

    return (
        <div>
            <h1>Resultados de búsqueda</h1>
            {searchResults.length === 0 ? (
                <p>No se encontraron resultados</p>
            ) : (
                <ul>
                    {searchResults.map((movie) => (
                        <li key={movie.id}>{movie.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ResultadosBusqueda;
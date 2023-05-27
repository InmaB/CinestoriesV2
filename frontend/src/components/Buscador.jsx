import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { searchMovies } from "../store";

const Buscador = () => {
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.cinestories.movies);
    const [searchQuery, setSearchQuery] = useState("");
    const [type, setType] = useState("movie");

    const handleSearch = () => {
        dispatch(searchMovies({ searchQuery, type }));
    };

    return (
        <div>
            <h1>Buscador</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="movie">Películas</option>
                <option value="tv">Series de TV</option>
            </select>
            <button onClick={handleSearch}>Buscar</button>

            {searchResults.length === 0 && <p>No se encontraron resultados</p>}
        </div>
    );
};

export default Buscador;

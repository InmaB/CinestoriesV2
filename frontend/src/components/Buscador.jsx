
//ESTE SI FUNCIONAAAAAAAAAAAAAAA
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { searchMovies } from "../store";
// import { Modal } from "bootstrap";

// const Buscador = () => {
//     const dispatch = useDispatch();
//     const [searchQuery, setSearchQuery] = useState("");
//     const searchResults = useSelector(state => state.cinestories.resultados);
//     const [type, setType] = useState("movie");


//     const handleSearch = () => {
//         if (searchQuery) {
//             dispatch(searchMovies({ searchQuery, type }));
//         };


//     };
//     return (
//         <div>
//             <h1>Buscador</h1>
//             <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <select value={type} onChange={(e) => setType(e.target.value)}>
//                 <option value="movie">Películas</option>
//                 <option value="tv">Series de TV</option>
//             </select>
//             <button onClick={handleSearch}>Buscar</button>

//             {searchResults.length === 0 && <p>No se encontraron resultados</p>}
//             <ul>
//                 {searchResults.map((movie, index) => (
//                     <li key={movie.id}>{movie.name || movie.title}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Buscador;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, searchMovies } from "../store";
import Modal from "./Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Buscador = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const searchResults = useSelector((state) => state.cinestories.resultados);
    const [type, setType] = useState("movie");
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    const handleClick = (movie) => {
        navigate('/infoPeli', { state: movie });
    };

    const handleSearch = () => {
        if (searchQuery) {
            dispatch(searchMovies({ searchQuery, type }));
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <Contenedor>
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

            <Modal open={modalOpen} onClose={closeModal}>
                <div className="modal-contenido">
                    {searchResults.length === 0 ? (
                        <p>No se encontraron resultados</p>
                    ) : (
                        <>
                            {searchResults.map((movie, index) => (
                                <div key={movie.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                                        alt="poster"
                                    />
                                    <button onClick={() => handleClick(movie)}>
                                        {movie.name || movie.title}
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </Modal>
        </Contenedor>
    );
};

export default Buscador;

const Contenedor = styled.div`
  img {
    float: left;
  }

  #texto {
    display: inline-block;
    vertical-align: top;
  }
`;

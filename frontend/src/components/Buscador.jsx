// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { searchMovies } from "../store";
// import styled from "styled-components";
// import PosterGeneral from "./CarouselYGrid/PosterGeneral";

// const Buscador = () => {
//     const movies = useSelector((state) => state.cinestories.movies);
//     const resultadosLoaded = useSelector((state) => state.cinestories.resultadosLoaded);
//     const dispatch = useDispatch();
//     // const searchResults = useSelector((state) => state.cinestories.movies);
//     const [searchQuery, setSearchQuery] = useState("");
//     // const [type, setType] = useState("movie");
//     const searchResults = useSelector(state => state.cinestories.resultados);
//     // console.log("holiiiiiii :(")
//     // console.log(searchResults)

//     // useEffect(() => {
//     //     dispatch(searchMovies());
//     // }, []);

//     // useEffect(() => {
//     //     if (resultadosLoaded) {
//     //         dispatch(searchMovies({ searchQuery }));
//     //     }
//     // }, [resultadosLoaded]);

//     useEffect(() => {
//         if (resultadosLoaded) {
//             dispatch(searchMovies({ searchQuery }));
//         }
//     }, [resultadosLoaded]);

//     const handleSearch = () => {

//         dispatch(searchMovies({ searchQuery }));
//     };



//     return (

//         <Contenedor>
//             <h1>Buscador</h1>
//             <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {/* <select value={type} onChange={(e) => setType(e.target.value)}>
//                 <option value="movie">Películas</option>
//                 <option value="tv">Series de TV</option>
//             </select> */}
//             <button onClick={handleSearch}>Buscar</button>

//             {searchResults.length === 0 && <p>No se encontraron resultados</p>}


//             {searchResults.map((movie, index) => {


//                 return <PosterGeneral movieData={movie} index={index} key={movie.id}> </PosterGeneral>
//             })}



//         </Contenedor>
//     );
// };

// export default Buscador;

// const Contenedor = styled.div`

// margin-bottom: 1rem;
//     input {
//     border: 0;
//     background-color: rgb(28, 28, 38);
//     padding: 0.5rem 1.5rem;
//     font-size: 1rem;
//     border-radius: 30px;
//     color: white;
// }
//  select {
//     border: 0;
//     background-color: rgb(28, 28, 38);
//     color: white;
//     padding: 0.5rem 1.5rem;
//     font-size: 1rem;
//  }

//  .box-search {
//     padding: 0.5rem;
//  }

//  .box-search-btn {
//     clear: both;
//     padding: 1rem;
//  }

// .btn {
//     border: 4px solid transparent;
//     background-color: white;
//     color: rgb(28, 28, 38);
//     border-radius: 30px;
//     padding: 0.5rem 1.5rem;
//     font-size: 1rem;
//     font-weight:bold;
//     box-shadow: 0px 0px 7px 8px gray;
//     transition: box-shadow 0.3s ease;
// }

// .btn:hover {
//     box-shadow: 0px 0px 7px 15px gray;
//     cursor: pointer;
// }

// .btn-outline {
//     border: 3px solid white;
//     background-color: transparent;
//     color: white;
//     box-shadow: unset;
//     transition: color 0.3s ease, background-color 0.3s ease;
// }

// .btn-outline:hover {
//     box-shadow: unset;
//     color: red;
//     background-color: white;
// }
// .resultado {
//     width: 100%;
//     text-align: center;
// }
// `


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { searchMovies } from "../store";
// import styled from "styled-components";
// import PosterGeneral from "./CarouselYGrid/PosterGeneral";

// const Contenedor = styled.div`
//   /* Agrega estilos CSS según sea necesario */
// `;

// const Buscador = () => {
//     const movies = useSelector((state) => state.cinestories.movies);
//     const resultadosLoaded = useSelector((state) => state.cinestories.resultadosLoaded);
//     // const moviesLoades = useSelector((state) => state.cinestories.resultadosLoaded);
//     const dispatch = useDispatch();
//     const [searchQuery, setSearchQuery] = useState("");
//     const searchResults = useSelector(state => state.cinestories.resultados);

//     useEffect(() => {

//         if (resultadosLoaded) {
//             dispatch(searchMovies({ searchQuery }));
//         }
//     }, [resultadosLoaded, dispatch, searchQuery]);

//     const handleSearch = () => {

//         dispatch(searchMovies({ searchQuery }));
//     };

//     return (
//         <Contenedor>
//             <h1>Buscador</h1>
//             <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button onClick={handleSearch}>Buscar</button>

//             {searchResults.length === 0 && <p>No se encontraron resultados</p>}
//             <ul>
//                 {searchResults.map((movie, index) => (
//                     <li movieData={movie} index={index} key={movie.id}> {movie.name || movie.title} </li>
//                 ))}
//             </ul>
//         </Contenedor>
//     );
// };

// export default Buscador;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { searchMovies } from "../store";
// import styled from "styled-components";
// import PosterGeneral from "./CarouselYGrid/PosterGeneral";

// const Contenedor = styled.div`
//   /* Agrega estilos CSS según sea necesario */
// `;

// const Buscador = () => {
//     const dispatch = useDispatch();
//     const [searchQuery, setSearchQuery] = useState("");
//     const searchResults = useSelector(state => state.cinestories.resultados);

//     // const sleep = (milliseconds) => {
//     //     return new Promise(resolve => setTimeout(resolve, milliseconds))
//     // }

//     useEffect(() => {
//         if (searchQuery) {
//             dispatch(searchMovies({ searchQuery }));
//             // sleep(2000);


//         }
//     }, [searchQuery, dispatch]);



//     const handleSearch = () => {
//         if (searchQuery) {
//             dispatch(searchMovies({ searchQuery }));
//         }
//     };


//     return (
//         <Contenedor>
//             <h1>Buscador</h1>
//             <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button onClick={handleSearch}>Buscar</button>

//             {searchResults.length === 0 && <p>No se encontraron resultados</p>}
//             <ul>
//                 {searchResults.map((movie, index) => (
//                     <li key={movie.id}>{movie.name || movie.title}</li>
//                 ))}
//             </ul>
//         </Contenedor>
//     );
// };

// export default Buscador;


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../store";

const Buscador = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const searchResults = useSelector(state => state.cinestories.resultados);
    const [type, setType] = useState("movie");


    const handleSearch = () => {
        if (searchQuery) {
            dispatch(searchMovies({ searchQuery, type }));
        };


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
            <ul>
                {searchResults.map((movie, index) => (
                    <li key={movie.id}>{movie.name || movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Buscador;
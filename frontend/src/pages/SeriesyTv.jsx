// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMovies, fetchMoviesByGenre, getGenres } from '../store';
// import Navbar from '../components/Navbar';
// import styled from 'styled-components';
// import Grid from '../components/CarouselYGrid/Grid';
// import Footer from '../components/Footer';
// import Buscador from '../components/Buscador';
// import Spinner from './Spinner';

// export default function Pelis() {

//   ///// VARIABLES /////
//   // Obtener datos de store utilizando useSelector
//   const movies = useSelector((state) => state.cinestories.movies);
//   const genres = useSelector((state) => state.cinestories.genres);
//   const genresLoaded = useSelector((state) => state.cinestories.genresLoaded);

//   // Definir variables locales utilizando useState y se inicializan.Por ejemplo: en "pelisVisibles" se inicializa con el valor 20 para determinar cuántas películas se mostrarán
//   const [mostrarPelis, setMostrarPelis] = useState(false);
//   const [pelisVisibles, setPelisVisibles] = useState(20);
//   const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
//   const [botonSeleccionado] = useState("boton-genero");


//   // Dispatch permite lanzar acciones (actions) al store, con la intención de afectar el estado
//   const dispatch = useDispatch();


//   ///// FUNCIONES /////
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simula una carga asincrónica
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//   }, []);

//   // Cargar los géneros al montar el componente
//   useEffect(() => {
//     dispatch(getGenres({ type: "movie" }));
//   }, []);

//   // Cargar las películas cuando se hayan cargado los géneros
//   useEffect(() => {
//     if (genresLoaded) {
//       dispatch(fetchMovies({ type: "movie" }));
//       setMostrarPelis(true);
//     }
//   }, [genresLoaded]);

//   // Manejar la selección de un género cuando se pulse el botón
//   const handleSeleccionGenero = (genreId) => {
//     setGeneroSeleccionado(genreId);

//     if (genreId !== null) {
//       dispatch(fetchMoviesByGenre({ type: "movie", genres_id: genreId }));
//       setMostrarPelis(true);
//     } else {
//       dispatch(fetchMovies({ type: "movie" }));
//       setMostrarPelis(true);
//     }
//   };

//   // Manejar la carga 20 películas más cuando se pulse al botón
//   const handleCargarMas = () => {
//     setPelisVisibles((prevPelisVisibles) => prevPelisVisibles + 20);
//   };

//   // Mostrar todas las películas que se realiza por defencto al acceder a la página "Pelis"
//   const handleMostrarTodo = () => {
//     setGeneroSeleccionado(null);
//     dispatch(fetchMovies({ type: "movie" }));
//     setMostrarPelis(true);
//   };

//   return (
//     <Contenedor>
//       <div className="navbar">
//         <Navbar />
//       </div>

//       <Contenido>

//         <h1 className='titulo'>Películas</h1>
//         <div className="buscador">
//           <Buscador />
//         </div>

//         <div className='flex-flow j-center'>
//           {/* Botón para mostrar todas las películas */}
//           <button
//             className={`boton-genero ${generoSeleccionado === null ? 'seleccionado' : ''}`}
//             onClick={handleMostrarTodo}
//           >
//             Todos
//           </button>

//           {/* Botones para mostrar películas por género */}
//           {genres.map((genre) => (
//             <button
//               className={`boton-genero ${generoSeleccionado === genre.id ? 'seleccionado' : ''}`}
//               key={genre.id}
//               onClick={() => handleSeleccionGenero(genre.id)}
//             >
//               {genre.name}
//             </button>
//           ))}
//         </div>

//         {/* Div para mostrar el texto de género seleccionado */}
//         {generoSeleccionado && botonSeleccionado === "boton-genero" && (
//           <div className="genero-seleccionado">
//             <h2 className='titulo2'> Has seleccionado el género: {genres.find((genre) => genre.id === generoSeleccionado)?.name}</h2>
//           </div>
//         )}

//         {/* Mostrar las películas en el Grid */}
//         {movies && mostrarPelis && <Grid movies={movies.slice(0, pelisVisibles)} />}

//         {/* Botón para cargar más películas */}
//         {movies && movies.length > pelisVisibles && (
//           <div className="cargar-mas">
//             <button className='cargar flex' onClick={handleCargarMas}>Cargar más</button>
//           </div>
//         )}

//       </Contenido>
//       <Footer></Footer>
//     </Contenedor>
//   );
// }

// const Contenedor = styled.div`
//   position: relative;
//   height: 100%;
// `;

// const Contenido = styled.div`
//   padding: 3rem 2rem 3rem 3rem;

//   .boton-genero.seleccionado {
//     background-color: lime;
//     color: black;
//   }

//   .genero-seleccionado {
//     margin-top: 20px;
//   }

//   .cargar {
//     background-color: #4CAF50;
//     border: none;
//     color: white;
//     padding: 1rem 2.5rem;
//     font-weight: bold;
//     text-align: center;
//     text-decoration: none;
//     font-size: 16px;
//     margin: 0 auto;
//     transition-duration: 0.4s;
//     cursor: pointer;
//     box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
//   }

//   .cargar:hover {
//   background-color: lime ;
//   color: rgb(48, 50, 62);
// }
// ;`

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMoviesByGenre, getGenres } from '../store';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Grid from '../components/CarouselYGrid/Grid';
import Footer from '../components/Footer';
import Buscador from '../components/Buscador';
import RiseLoader from 'react-spinners/RiseLoader';

export default function SeriesyTv() {
  const movies = useSelector((state) => state.cinestories.movies);
  const genres = useSelector((state) => state.cinestories.genres);
  const genresLoaded = useSelector((state) => state.cinestories.genresLoaded);
  const dispatch = useDispatch();
  const [mostrarPelis, setMostrarPelis] = useState(false);
  const [pelisVisibles, setPelisVisibles] = useState(20);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
  const [botonSeleccionado] = useState("boton-genero");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(getGenres({ type: "movie" }));
  }, [])

  useEffect(() => {
    dispatch(getGenres({ type: "tv" }));
  }, [])

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "tv" }));
      setMostrarPelis(true);
    }
  }, [genresLoaded]);

  const handleSeleccionGenero = (genreId) => {
    setGeneroSeleccionado(genreId);

    if (genreId !== null) {
      dispatch(fetchMoviesByGenre({ type: "tv", genres_id: genreId }));
      setMostrarPelis(true);
    } else {
      dispatch(fetchMovies({ type: "tv" }));
      setMostrarPelis(true);
    }
  };

  const handleCargarMas = () => {
    setPelisVisibles((prevPelisVisibles) => prevPelisVisibles + 20);
  };

  const handleMostrarTodo = () => {
    setGeneroSeleccionado(null);
    dispatch(fetchMovies({ type: "tv" }));
    setMostrarPelis(true);
  };

  return (
    <Contenedor>
      <div className="navbar">
        <Navbar />
      </div>

      <Contenido>
        <h1 className='titulo'>Películas</h1>
        <div className="buscador">
          <Buscador />
        </div>

        <div className='flex-flow j-center'>
          <button
            className={`boton-genero ${generoSeleccionado === null ? 'seleccionado' : ''}`}
            onClick={handleMostrarTodo}
          >
            Todos
          </button>

          {genres.map((genre) => (
            <button
              className={`boton-genero ${generoSeleccionado === genre.id ? 'seleccionado' : ''}`}
              key={genre.id}
              onClick={() => handleSeleccionGenero(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {generoSeleccionado && botonSeleccionado === "boton-genero" && (
          <div className="genero-seleccionado">
            <h2 className='titulo2'> Has seleccionado el género: {genres.find((genre) => genre.id === generoSeleccionado)?.name}</h2>
          </div>
        )}

        {loading ? (
          <SpinnerContainer>
            <RiseLoader color='lime' />
          </SpinnerContainer>
        ) : (
          <>
            {movies && mostrarPelis && <Grid movies={movies.slice(0, pelisVisibles)} />}

            {movies && movies.length > pelisVisibles && (
              <div className="cargar-mas">
                <button className='cargar flex' onClick={handleCargarMas}>Cargar más</button>
              </div>
            )}
          </>
        )}
      </Contenido>

      <Footer />
    </Contenedor>
  );
}

const Contenedor = styled.div`
  position: relative;
  height: 100%;
`;

const Contenido = styled.div`
  padding: 3rem 2rem 3rem 3rem;

  .boton-genero.seleccionado {
    background-color: lime;
    color: black;
  }

  .genero-seleccionado {
    margin-top: 20px;
  }

  .cargar {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 1rem 2.5rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 0 auto;
    transition-duration: 0.4s;
    cursor: pointer;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }

  .cargar:hover {
    background-color: lime;
    color: rgb(48, 50, 62);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

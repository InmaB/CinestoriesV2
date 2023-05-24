// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchMovies, fetchMoviesByGenre, getGenres } from '../store';
// import Navbar from '../components/Navbar';
// import styled from 'styled-components';
// import PelisGrid from '../components/PelisGrid';

// export default function Pelis() {
//   const navegacion = useNavigate();
//   const movies = useSelector((state) => state.cinestories.movies);
//   const genres = useSelector((state) => state.cinestories.genres);
//   const genresLoaded = useSelector((state) => state.cinestories.genresLoaded);
//   const [showMovies, setShowMovies] = useState(false);

//   const [visibleMovies, setVisibleMovies] = useState(20);

//   const handleLoadMore = () => {
//     setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 20);
//   };

//   useEffect(() => {
//     if (genresLoaded) {
//       dispatch(fetchMovies({ type: "movie" }));
//       setShowMovies(true);
//     }
//   }, [genresLoaded]);
//   const dispatch = useDispatch();
//   const [selectedGenre, setSelectedGenre] = useState(null);

//   useEffect(() => {
//     dispatch(getGenres());
//   }, []);

//   const handleGenreSelection = (genreId) => {
//     setSelectedGenre(genreId);
//     dispatch(fetchMoviesByGenre({ type: "movie", genres_id: genreId }));
//   };

//   return (
//     <Contenedor>
//       <div className="navbar">
//         <Navbar />
//       </div>

//       <div className="portada">
//         {genres.map((genre) => (
//           <button
//             className={`boton-genero ${selectedGenre === genre.id ? 'seleccionado' : ''}`}
//             key={genre.id}
//             onClick={() => handleGenreSelection(genre.id)}
//           >
//             {genre.name}

//           </button>
//         ))}

//         {selectedGenre && (
//           <div className="genero-seleccionado">
//             <h1 className='service-subtitle'> Has seleccionado el género: {genres.find((genre) => genre.id === selectedGenre)?.name}</h1>

//           </div>
//         )}
//         {/* {showMovies && <PelisGrid movies={movies} />} */}

//         {showMovies && <PelisGrid movies={movies.slice(0, visibleMovies)} />}
//         {movies.length > visibleMovies && (
//           <div className="cargar-mas">
//             <button onClick={handleLoadMore}>Cargar más</button>
//           </div>
//         )}
//       </div>
//     </Contenedor>
//   );
// }

// const Contenedor = styled.div`
//   .portada {
//     padding: 6rem 3rem 3rem 3rem;
//   }


//   .boton-genero.seleccionado {
//     background-color: lime;
//     color: black;
//   }

//   .genero-seleccionado {
//     margin-top: 20px;
//   }
// `;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, fetchMoviesByGenre, getGenres } from '../store';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import PelisGrid from '../components/PelisGrid';

export default function Pelis() {
  const navegacion = useNavigate();

  const movies = useSelector((state) => state.cinestories.movies);
  const genres = useSelector((state) => state.cinestories.genres);
  const genresLoaded = useSelector((state) => state.cinestories.genresLoaded);

  const [showMovies, setShowMovies] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState(20);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "movie" }));
      setShowMovies(true);
    }
  }, [genresLoaded]);

  const handleGenreSelection = (genreId) => {
    setSelectedGenre(genreId);

    if (genreId) {
      dispatch(fetchMoviesByGenre({ type: "movie", genres_id: genreId }));
      setShowMovies(true);
    } else {
      dispatch(fetchMovies({ type: "movie" }));
      setShowMovies(true);
    }
  };

  const handleLoadMore = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 20);
  };

  const handleShowAll = () => {
    setSelectedGenre(null);
    dispatch(fetchMovies({ type: "movie" }));
    setShowMovies(true);
  };

  return (
    <Contenedor>
      <div className="navbar">
        <Navbar />
      </div>

      <Contenido>
        <div className='flex-flow j-center'>
          <button
            className={`boton-genero ${selectedGenre === null ? 'seleccionado' : ''}`}
            onClick={handleShowAll}
          >
            Todos
          </button>

          {genres.map((genre) => (
            <button
              className={`boton-genero ${selectedGenre === genre.id ? 'seleccionado' : ''}`}
              key={genre.id}
              onClick={() => handleGenreSelection(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {selectedGenre && (
          <div className="genero-seleccionado">
            <h1 className='titulo'> Has seleccionado el género: {genres.find((genre) => genre.id === selectedGenre)?.name}</h1>
          </div>
        )}

        {showMovies && <PelisGrid movies={movies.slice(0, visibleMovies)} />}
        {movies.length > visibleMovies && (
          <div className="cargar-mas">
            <button className='cargar flex' onClick={handleLoadMore}>Cargar más</button>
          </div>
        )}
      </Contenido>
    </Contenedor>
  );
}

const Contenedor = styled.div`
`;

const Contenido = styled.div`
  padding: 6rem 3rem 3rem 3rem;


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
  background-color: lime ;
  color: rgb(48, 50, 62);
}
;`
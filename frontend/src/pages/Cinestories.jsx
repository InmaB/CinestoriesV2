import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByRated, fetchMovieByRated, fetchMovies, fetchTvByRated, fetchUpcoming, getGenres } from '../store';
import CarouselHome from '../components/Carousel/CarouselHome';
import CarouselGeneral from '../components/Carousel/CarouselGeneral';
import PelisGrid from '../components/PelisGrid';
import Navbar from '../components/Navbar';



export default function Cinestories() {

  const navegacion = useNavigate();

  const movies = useSelector((state) => state.cinestories.movies);

  const genres = useSelector((state) => state.cinestories.genres);
  const genresLoaded = useSelector((state) => state.cinestories.genresLoaded)
  const moviesByRated = useSelector(state => state.cinestories.moviesByRated);
  const tvByRated = useSelector(state => state.cinestories.tvByRated)
  const upcoming = useSelector(state => state.cinestories.upcoming)

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getGenres());
  }, [])

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }))
  }, [genresLoaded])


  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovieByRated())
  }, [genresLoaded])

  useEffect(() => {
    if (genresLoaded) dispatch(fetchTvByRated())
  }, [genresLoaded])

  useEffect(() => {
    if (genresLoaded) dispatch(fetchUpcoming())
  }, [genresLoaded])


  return (
    <Contenedor>
      <Navbar></Navbar>
      <div className="portada">
        <CarouselHome></CarouselHome>
      </div>
      <div className="contenido">

        <CarouselGeneral movies={movies} moviesByRated={moviesByRated} tvByRated={tvByRated} upcoming={upcoming} />
      </div>


    </Contenedor>
  );
}

const Contenedor = styled.div`
  background-color: linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42));;
  margin-bottom: 4rem;
  .portada {
    position: relative;
    margin-bottom: 2rem;
  .contenido {
    padding: 6rem 3rem 3rem 3rem;
    position: absolute;
    bottom: 5rem;
    }
  }
`


// import React, { useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { FaPlay } from 'react-icons/fa';
// import { AiOutlineAntDesign } from 'react-icons/ai';
// import styled from 'styled-components';
// import Slider from 'react-slick';
// import { useNavigate } from 'react-router-dom';
// import CarouselHome from '../components/CarouselHome'


// const Cinestories = () => {
//   const URL_TMBD = 'https://api.themoviedb.org/3/';
//   const KEY_API = 'dc2d353b9ddadaebcdfa5c1f93065747';
//   const LENG_TMBD = 'es-ES';
//   const totalPag = 10;

//   const [movies, setMovies] = React.useState([]);
//   const navegacion = useNavigate();



//   useEffect(() => {
//     const fetchMovies = async () => {
//       const moviesArray = [];

//       for (let i = 1; i <= totalPag; i++) {
//         const response = await axios.get(
//           `${URL_TMBD}trending/all/week?api_key=${KEY_API}&${LENG_TMBD}&page=${i}`
//         );
//         const results = response.data.results;
//         moviesArray.push(...results);
//       }

//       setMovies(moviesArray);
//       console.log(moviesArray)
//     };

//     fetchMovies();
//   }, []);

//   return (
//     <Contenedor>
//       <Navbar />
//       <div className="hero">

//         <div className="contenido">
//           <CarouselHome></CarouselHome>
//           <div className="buttons flex">
//             <button className="flex j-center a-center" onClick={() => navegacion('/reproductor')}>
//               <FaPlay />Play
//             </button>
//           </div>
//           <div className="buttons flex">
//             <button className="flex j-center a-center">
//               <AiOutlineAntDesign />+ info
//             </button>
//           </div>
//         </div>
//       </div>
//       <Slider movies={movies} />
//       {/* Coloca aquí tu componente Slider y pasa el array de películas como prop */}
//     </Contenedor>
//   );
// };

// const Contenedor = styled.div`
//   background-color: linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42));

//   .hero {
//     position: relative;

//     .contenido {
//       position: absolute;
//       bottom: 5rem;

//       .buttons {
//         margin: 5rem;
//         gap: 2rem;

//         button {
//           font-size: 1.4rem;
//           gap: 1rem;
//           border-radius: 0.2rem;
//           padding-left: 2rem;
//           padding-right: 2rem;
//           cursor: pointer;
//           transition: 0.3s ease-in-out;

//           &:hover {
//             opacity: 0.8;
//           }
//         }
//       }
//     }
//   }

// `
// export default Cinestories;

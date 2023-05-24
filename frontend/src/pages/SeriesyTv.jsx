import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import CarouselGeneral from '../components/Carousel/CarouselGeneral'


export default function SeriesyTv() {
  const navegacion = useNavigate();

  const movies = useSelector((state) => state.cinestories.movies);
  const genres = useSelector((state) => state.cinestories.genres);
  const genresLoaded = useSelector((state) => state.cinestories.genresLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
  }, [genresLoaded]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(firebaseAuth, (usuario) => {
  //     if (usuario) {
  //       navegacion("/");
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <Contenedor>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="data">

        {movies.length ? <CarouselGeneral movies={movies}></CarouselGeneral> : "No hay películas"}
      </div>
    </Contenedor>
  );
}

const Contenedor = styled.div``;

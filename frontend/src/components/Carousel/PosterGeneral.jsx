import styled from 'styled-components';
<<<<<<<< HEAD:frontend/src/components/PosterPanel.jsx
import { URL_TMBD, KEY_API, IMG_API } from '../utils/tmbd-config';
import { useEffect, useState } from 'react';
import PosterNotFound from '../assets/posterNotFound.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchPelis, getGenres } from '../store';
========
import { URL_TMBD, KEY_API, IMG_API } from '../../utils/tmbd-config';
import { useEffect } from 'react';
import PosterNotFound from '../../assets/posterNotFound.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../../store';
>>>>>>>> 55277403d20e4d25f72ed70bcb2a5c14009a7203:frontend/src/components/Carousel/PosterGeneral.jsx



export default function PosterGeneral({ movieData }) {
  const movies = useSelector((state) => state.cinestories.movies);
  const genres = useSelector((state) => state.cinestories.genres);
  const genresLoaded = useSelector((state) => state.cinestories.genresLoaded);

  console.log(movieData)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const handleClick = () => {
    navigate('/infoPeli', { state: movieData });
  };

  return (
    <CajaPoster>
      {/* `${IMG_API}${movieData.poster_path}` */}
<<<<<<<< HEAD:frontend/src/components/PosterPanel.jsx
      <ImagenPoster src={`https://image.tmdb.org/t/p/w500/` + movieData.poster_path ? IMG_API + movieData.poster_path : PosterNotFound} alt="Poster22" onClick={handleClick} />
========
      <ImagenPoster
        src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}` : PosterNotFound}
        alt="Poster"
        onClick={handleClick}
      />
>>>>>>>> 55277403d20e4d25f72ed70bcb2a5c14009a7203:frontend/src/components/Carousel/PosterGeneral.jsx
      <TextOverlay>
        <Text>{movieData.name || movieData.title}</Text>
      </TextOverlay>
    </CajaPoster>
  );
}

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;

`;

const CajaPoster = styled.div`
  align-items: center;
  text-align: center;
  position: relative;

  &:hover ${TextOverlay} {
    opacity: 1;
  }


  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
`;

const ImagenPoster = styled.img`
  width: 100%;
  height: 90%;
  box-shadow: 0 5px 10px black;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    border: 2px solid lime;
  }


  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Text = styled.div``;

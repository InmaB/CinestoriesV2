
import styled from 'styled-components';
import { URL_TMBD, KEY_API, IMG_API } from '../../utils/tmbd-config';
import { useEffect, useState } from 'react';
import PosterNotFound from '../../assets/posterNotFound.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchPelis, getGenres } from '../../store';

export default function PosterTopRated({ movieData, index }) {
  const movies = useSelector((state) => state.cinestories.movies);
  const genres = useSelector((state) => state.cinestories.genres);
  const genresLoaded = useSelector((state) => state.cinestories.genresLoaded);

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
      <ImagenPoster src={`https://image.tmdb.org/t/p/w500/` + movieData.poster_path ? IMG_API + movieData.poster_path : PosterNotFound} alt="Poster22" onClick={handleClick} />
      <TextOverlay>
        <Text>{movieData.name}</Text>
      </TextOverlay>
      <Posicion><h2>Ranking:</h2></Posicion>
      <NumberOverlay className='hit-the-floor'>{index + 1}</NumberOverlay>
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

const Posicion = styled.div`
    h2 {
        position: absolute;
  bottom: 1rem;
  left: 1rem;
  -webkit-text-stroke: 1px black;
text-shadow: black 0.2em 0.1em 0.2em;
font-weight:bold;
    }
`


const NumberOverlay = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

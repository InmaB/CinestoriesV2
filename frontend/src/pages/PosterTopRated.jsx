import styled from 'styled-components';
import { URL_TMBD, KEY_API, IMG_API } from '../../utils/tmbd-config';
import { useEffect, useState } from 'react';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchPelis, getGenres } from '../../store';



export default function PosterTopRated({ movieData }) {
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
      <ImagenPoster src={IMG_API + movieData.backdrop_path} alt="Poster" onClick={handleClick} />
      <TextOverlay>
        <Text>{movieData.name}</Text>
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

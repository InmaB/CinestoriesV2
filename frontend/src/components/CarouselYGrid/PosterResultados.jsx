import styled from 'styled-components';
import { URL_TMBD, KEY_API, IMG_API } from '../../utils/tmbd-config';
import { useEffect } from 'react';
import PosterNotFound from '../../assets/posterNotFound.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../../store';

export default function PosterResultados({ movieData }) {
  const movies = useSelector((state) => state.cinestories.movies);
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
      <ImagenPoster
        src={movieData.poster_path ? `https://image.tmdb.org/t/p/w90/${IMG_API}${movieData.poster_path}` : PosterNotFound}
        alt="Poster"
        onClick={handleClick}
      />
      <Text>{movieData.name || movieData.title}</Text>
    </CajaPoster>
  );
}

const CajaPoster = styled.div`
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const ImagenPoster = styled.img`
  width: 100%;
  height: 90%;
  box-shadow: 0 5px 10px black;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    border: 3px solid lime;
  }
`;

const Text = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 5px;
`;

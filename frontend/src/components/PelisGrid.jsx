import React from 'react';
import styled from 'styled-components';
import PosterPanel from '../components/PosterPanel'



export default function PelisGrid({ movies, visibleMovies }) {

  return (
    <Contenedor>
      <div className="grid flex">
        {movies.slice(0, visibleMovies).map((movie, index) => {

          return <PosterPanel movieData={movie} index={index} key={movie.id}> </PosterPanel>
        })}
      </div>

    </Contenedor>
  )
}

const Contenedor = styled.div`
.grid {
  margin-top:1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Mostrar 5 elementos por fila */
  gap: 20px; /* Espacio entre los elementos del grid */
}
`;

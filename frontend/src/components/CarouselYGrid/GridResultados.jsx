import React, { useState } from 'react';
import styled from 'styled-components';
import PosterResultados from '../CarouselYGrid/PosterResultados';

export default function GridResultados({ searchResults }) {
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the starting and ending index of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the movies to display on the current page
  const moviesToDisplay = searchResults.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <Contenedor>
      <div className="grid flex">
        {moviesToDisplay.map((movie, index) => (
          <div key={movie.id}>
            <PosterResultados movieData={movie} index={index} />



          </div>
        ))}
      </div>

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            active={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  .grid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(8, 1fr); /* Mostrar 8 elementos por fila */
    gap: 20px; /* Espacio entre los elementos del grid */
  }
`;

const Pagination = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem;
  background-color: ${({ active }) => (active ? 'gray' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border: 1px solid gray;
  cursor: pointer;
`;

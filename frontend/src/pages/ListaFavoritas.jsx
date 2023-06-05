import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchByGenre, fetchMovies, getGenres, getUserFavoritas } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import PosterListas from '../components/PosterListas';

import { AiFillDelete } from 'react-icons/ai';

export default function ListaFavoritas() {
    const navegacion = useNavigate();

    const movies = useSelector((state) => state.cinestories.movies);


    const [email, setEmail] = useState(undefined)

    onAuthStateChanged(firebaseAuth, (Usuario) => {

        if (Usuario) setEmail(Usuario.email)
        else navegacion("/login")
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (email) {
            dispatch(getUserFavoritas(email))
        }
    }, [email]);


    return (
        <Contenedor>
            <Navbar></Navbar>
            <div className="content flex column">
                <h1>Mi lista de favoritos</h1>
                <div className="grid flex">
                    {movies.map((movie, index) => {
                        <AiFillDelete></AiFillDelete>
                        return <PosterListas movieData={movie} index={index} key={movie.id}> </PosterListas>
                    })}
                </div>
            </div>
        </Contenedor>
    )
}

const Contenedor = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchByGenre, fetchMovies, getGenres, getUserFavoritas } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

import { AiFillDelete } from 'react-icons/ai';
import PosterListas from '../components/CarouselYGrid/PosterListas';
import axios from 'axios';

export default function ListaFavoritas() {
    const navegacion = useNavigate();
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.cinestories.movies);
    const [showMessage, setShowMessage] = useState(false);
    const [email, setEmail] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (Usuario) => {
            if (Usuario) {
                setEmail(Usuario.email);
            } else {
                navegacion('/login');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (email) {
            dispatch(getUserFavoritas(email));
        }
    }, [email]);

    const deleteListaFavoritas = async (movieId) => {
        try {
            await axios.delete('http://localhost:5000/api/user/eliminarFav', { email, movieId });
            setShowMessage(true); // Mostrar el mensaje después de borrar de favoritos
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Contenedor>
            <Navbar></Navbar>
            <div className="content flex column">
                <h1>Mi lista de favoritos</h1>
                <div className="grid flex">
                    {movies.map((movie, index) => (
                        <div key={movie.id}>
                            <button onClick={() => deleteListaFavoritas(movie.id)}><AiFillDelete /></button>
                            <PosterListas movieData={movie} index={index}></PosterListas>
                        </div>
                    ))}
                </div>
            </div>
        </Contenedor>
    );
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

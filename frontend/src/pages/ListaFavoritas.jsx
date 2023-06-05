import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserFavoritas } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import PosterListas from '../components/CarouselYGrid/PosterListaFav';
import Footer from '../components/Footer';
import RiseLoader from 'react-spinners/RiseLoader';

export default function ListaFavoritas() {
    const navegacion = useNavigate();

    const movies = useSelector((state) => state.cinestories.movies);
    const [email, setEmail] = useState(undefined);
    const [loading, setLoading] = useState(true); // Estado para controlar el estado de carga


    onAuthStateChanged(firebaseAuth, (Usuario) => {

        if (Usuario) setEmail(Usuario.email)
        else navegacion("/login")
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (email) {
            dispatch(getUserFavoritas(email)).then(() => {
                setLoading(false); // Marcar la carga como completa cuando los datos se hayan cargado
            });
        }
    }, [email]);

    return (
        <Contenedor>
            <Navbar />
            <Contenido>
                <div className="content flex column">
                    <h1 className="titulo">Mi lista de favoritas</h1>
                    {loading ? (
                        <SpinnerContainer>
                            <RiseLoader color="lime" loading={loading} />
                        </SpinnerContainer>
                    ) : movies && movies.length > 0 ? (
                        <div className="grid flex">
                            {movies.map((fav) => (
                                <PosterListas key={fav.movieId} movieData={fav} />
                            ))}
                        </div>
                    ) : (
                        <h1>No hay favoritos</h1>
                    )}
                </div>
            </Contenido>
            <Footer></Footer>
        </Contenedor>
    );
}

const Contenedor = styled.div``;
const Contenido = styled.div`
  padding: 3rem 2rem 3rem 3rem;
  .grid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* Mostrar 5 elementos por fila */
    gap: 20px; /* Espacio entre los elementos del grid */
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

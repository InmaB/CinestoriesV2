import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserPendientes } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import PosterListaPendiente from '../components/CarouselYGrid/PosterListasPendiente';
import PosterListas from '../components/CarouselYGrid/PosterListas';

export default function ListaPendientes() {
    const navegacion = useNavigate();

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.cinestories.movies);
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
            dispatch(getUserPendientes(email));
        }
    }, [email]);

    return (
        <Contenedor>
            <Navbar />
            <Contenido>
                <div className="content flex column">
                    <h1 className="titulo">Mi lista de pendientes</h1>
                    {movies && movies.length > 0 ? (
                        <div className="grid flex">
                            {movies.map((pendiente) => (
                                <PosterListas key={pendiente.movieId} movieData={pendiente} />
                            ))}

                        </div>
                    ) : (
                        <h1>No hay pendientes</h1>
                    )}
                </div>
            </Contenido>
        </Contenedor>
    );

}

const Contenedor = styled.div``
const Contenido = styled.div`
padding: 3rem 2rem 3rem 3rem;
.grid {
  margin-top:2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Mostrar 5 elementos por fila */
  gap: 20px; /* Espacio entre los elementos del grid */
}
`;
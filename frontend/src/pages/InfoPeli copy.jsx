

// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { URL_TMBD, KEY_API, IMG_API } from '../utils/tmbd-config';
// import styled from 'styled-components';
// import Navbar from '../components/Navbar';
// import { onAuthStateChanged } from 'firebase/auth';
// import { firebaseAuth } from '../utils/firebase-config';
// import axios from "axios"
// import { FaPlay } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import Comentario from '../components/Comentario';
// import { BiHappyHeartEyes } from 'react-icons/bi'
// import { BsCardChecklist } from 'react-icons/bs'
// import { getUserFavoritas } from '../store';
// import PosterNotFound from '../assets/posterNotFound.jpg'


// export default function InfoPeli() {
//   const location = useLocation();
//   const movieData = location.state;
//   const navegacion = useNavigate()
//   const dispatch = useDispatch()

//   const isMounted = useRef(false);
//   const [email, setEmail] = useState("");
//   const [isInFavorites, setIsInFavorites] = useState(false);
//   const [showMessage, setShowMessage] = useState(false);

//   useEffect(() => {
//     isMounted.current = true;

//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   useEffect(() => {
//     onAuthStateChanged(firebaseAuth, (Usuario) => {
//       if (isMounted.current) {
//         if (Usuario) setEmail(Usuario.email);
//         else navegacion("/login");
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (email) {
//       dispatch(getUserFavoritas(email)).then((favoritas) => {
//         const found = Array.isArray(favoritas) && favoritas.some((pelicula) => pelicula.id === movieData.id);
//         setIsInFavorites(found);
//       });
//     }
//   }, [email, dispatch, movieData.id]);

//   const aniadirListaFav = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/user/aniadirFav", { email, data: movieData })
//       setShowMessage(true); // Mostrar el mensaje después de añadir a favoritos
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const aniadirListaPendientes = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/user/aniadirPendientes", { email, data: movieData })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const handleClick = () => {
//     setShowMessage(false); // Ocultar el mensaje cuando se haga clic en el botón de añadir a favoritos nuevamente
//   };

//   const handleComentario = (comment) => {
//     // Lógica para procesar el comentario enviado
//     console.log('Comentario enviado:', comment);
//   };

//   return (
//     <Contenedor>

//       <div className="navbar">
//         <Navbar></Navbar>
//       </div>
//       <h1>PRUEBA <br></br>
//         dsfdsf
//       </h1>


//       <img src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}` : PosterNotFound}
//         alt="Poster22" />

//       <h1>{movieData.name}</h1>
//       <h3>Título Original</h3>
//       <p>{movieData.original_title}</p>
//       <h3>Valoración</h3>
//       <p>{movieData.vote_average}</p>
//       <h3>Año</h3>
//       <p>{movieData.release_date}</p>
//       <h3>Género</h3>
//       <ul>
//         {movieData.genres.map((genre, index) => (
//           <li key={index}>{genre}</li>
//         ))}
//       </ul>
//       <h3>Sinopsis</h3>
//       <p>{movieData.overview}</p>

//       {isInFavorites ? (
//         <p>prueba</p>

//       ) : (
//         <button onClick={() => {
//           aniadirListaFav();
//           handleClick();
//         }} title='Añadir a favoritos'>
//           <BiHappyHeartEyes className='icono' />
//         </button>
//       )}

//       {showMessage && <p>Añadido Correctamente</p>}

//       <button onClick={aniadirListaPendientes} title='Añadir a pendientes'>
//         <BsCardChecklist className='icono' ></BsCardChecklist> </button>

//       <button className='flex j-center a-center' onClick={() => navegacion("/reproductor")}><FaPlay>Play</FaPlay></button>

//       <Comentario onSubmit={handleComentario}></Comentario>
//     </Contenedor>
//   );
// }

// const Contenedor = styled.div`
//   color:white;

//   .icono {
//     font-size: 2rem;
//   }
// `;

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios';
import { FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Comentario from '../components/Comentario';
import { BiHappyHeartEyes } from 'react-icons/bi';
import { BsCardChecklist } from 'react-icons/bs';
import { getUserFavoritas } from '../store';
import PosterNotFound from '../assets/posterNotFound.jpg';
import { URL_TMBD, KEY_API, IMG_API } from '../utils/tmbd-config';

export default function InfoPeli() {
  const location = useLocation();
  const movieData = location.state;
  const navegacion = useNavigate();
  const dispatch = useDispatch();

  const isMounted = useRef(false);
  const [email, setEmail] = useState('');
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (Usuario) => {
      if (isMounted.current) {
        if (Usuario) setEmail(Usuario.email);
        else navegacion('/login');
      }
    });
  }, []);

  useEffect(() => {
    if (email) {
      dispatch(getUserFavoritas(email)).then((favoritas) => {
        const found =
          Array.isArray(favoritas) &&
          favoritas.some((pelicula) => pelicula.id === movieData.id);
        setIsInFavorites(found);
      });
    }
  }, [email, dispatch, movieData.id]);

  const aniadirListaFav = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/aniadirFav', {
        email,
        data: movieData,
      });
      setIsInFavorites(true);
      setShowMessage(true); // Mostrar el mensaje después de añadir a favoritos
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfInFavorites = async (email, movieId) => {
    try {
      const favoritas = await dispatch(getUserFavoritas(email));
      return Array.isArray(favoritas) && favoritas.some((pelicula) => pelicula.id === movieId);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const aniadirListaPendientes = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/aniadirPendientes', {
        email,
        data: movieData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setShowMessage(false); // Ocultar el mensaje cuando se haga clic en el botón de añadir a favoritos nuevamente
  };

  const handleComentario = (comment) => {
    // Lógica para procesar el comentario enviado
    console.log('Comentario enviado:', comment);
  };

  return (
    <Contenedor>
      <div className="navbar">
        <Navbar />
      </div>
      <h1>
        PRUEBA <br />
        dsfdsf
      </h1>
      <img
        src={
          movieData.poster_path
            ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}`
            : PosterNotFound
        }
        alt="Poster22"
      />
      <h1>{movieData.name}</h1>
      <h3>Título Original</h3>
      <p>{movieData.original_title}</p>
      <h3>Valoración</h3>
      <p>{movieData.vote_average}</p>
      <h3>Año</h3>
      <p>{movieData.release_date}</p>
      <h3>Género</h3>
      <ul>
        {movieData.genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
      <h3>Sinopsis</h3>
      <p>{movieData.overview}</p>
      {isInFavorites ? (
        <p>Ya está añadido a favoritos.</p>
      ) : (
        <button onClick={() => {
          aniadirListaFav();
          handleClick();
        }} title="Añadir a favoritos">
          <BiHappyHeartEyes className="icono" />
        </button>
      )}
      {showMessage && !isInFavorites && <p>Añadido correctamente a favoritos.</p>}
      <button onClick={aniadirListaPendientes} title="Añadir a pendientes">
        <BsCardChecklist className="icono" />
      </button>
      <button className="flex j-center a-center" onClick={() => navegacion('/reproductor')}>
        <FaPlay>Play</FaPlay>
      </button>
      <Comentario onSubmit={handleComentario} />
    </Contenedor>
  );
}

const Contenedor = styled.div`
  color:white;

  .icono {
    font-size: 2rem;
  }
`;

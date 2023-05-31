// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import Navbar from '../components/Navbar';
// import { onAuthStateChanged } from 'firebase/auth';
// import { firebaseAuth } from '../utils/firebase-config';
// import axios from 'axios';
// import { FaPlay } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import Comentario from '../components/Comentario';
// import { BiHappyHeartEyes } from 'react-icons/bi';
// import { BsCardChecklist } from 'react-icons/bs';
// import { getUserFavoritas, removeMovieFromLiked } from '../store';
// import PosterNotFound from '../assets/posterNotFound.jpg';
// import { URL_TMBD, KEY_API, IMG_API } from '../utils/tmbd-config';


// const InfoPeli = () => {

//   const { idPelicula } = useParams();
//   const location = useLocation();
//   const movieData = location.state;
//   const navegacion = useNavigate();
//   const dispatch = useDispatch();

//   const isMounted = useRef(false);
//   const [email, setEmail] = useState('');
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
//         else navegacion('/login');
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
//       await axios.post('http://localhost:5000/api/user/aniadirFav', {
//         email,
//         data: movieData,
//       });
//       setIsInFavorites(true);
//       setShowMessage(true); // Mostrar el mensaje después de añadir a favoritos
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleComentario = (comment) => {
//     // Lógica para procesar el comentario enviado
//     console.log('Comentario enviado:', comment);
//   };

//   const deleteListaFavoritas = async () => {
//     try {
//       await axios.delete('http://localhost:5000/api/user/eliminarFav', {
//         data: {
//           email,
//           movieId: movieData.id
//         }
//       });
//       setShowMessage(true);
//       dispatch(removeMovieFromLiked({ movieId: movieData.id, email }));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Contenedor>
//       <Contenido></Contenido>
//       <div className="navbar">
//         <Navbar />
//       </div>
//       <h1>
//         PRUEBA <br />
//         dsfdsf
//       </h1>
//       <img
//         src={
//           movieData.poster_path
//             ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}`
//             : PosterNotFound
//         }
//         alt="Poster22"
//       />
//       <h1>{movieData.name || movieData.title}</h1>
//       <h3>Título Original</h3>
//       <p>{movieData.original_title || movieData.original_name}</p>
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
//         <p>Ya está añadido a favoritos.</p>
//       ) : (
//         <button onClick={() => {
//           aniadirListaFav();
//           setShowMessage(true); // Mostrar el mensaje cuando se haga clic en el botón de añadir a favoritos
//         }} title="Añadir a favoritos">
//           <BiHappyHeartEyes className="icono" />
//         </button>
//       )}
//       {showMessage && !isInFavorites && <p>Añadido correctamente a favoritos.</p>}
//       {/* <button onClick={() => dispatch(removeMovieFromLiked({ movieId: movieData.id, email }))} title="Eliminar">
//         <AiFillDelete className="icono" />
//       </button> */}
//       {/* <button onClick={deleteListaFavoritas} title="Eliminar">
//         <AiFillDelete className="icono" />
//       </button> */}
//       <button title="Añadir a pendientes">
//         <BsCardChecklist className="icono" />
//       </button>
//       <button className="flex j-center a-center" onClick={() => navegacion(`/reproductor/${idPelicula}`)}>
//         <FaPlay>Play</FaPlay>
//       </button>

//       <Comentario onSubmit={handleComentario} />
//     </Contenedor>
//   );
// }

// export default InfoPeli;


// const Contenedor = styled.div`
//   color:white;

//   .icono {
//     font-size: 2rem;
//   }
// `;



// const Contenido = styled.div`
//     padding: 7rem 2rem 3rem 3rem;
// `


import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavoritas, removeMovieFromLiked } from '../store';
import PosterNotFound from '../assets/posterNotFound.jpg';
import { URL_TMBD, KEY_API, IMG_API } from '../utils/tmbd-config';
import Footer from '../components/Footer';


export default function InfoPeli() {

  const { idPelicula } = useParams();
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
        const found = Array.isArray(favoritas) && favoritas.some((pelicula) => pelicula.id === movieData.id);
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

  const handleComentario = (comment) => {
    // Lógica para procesar el comentario enviado
    console.log('Comentario enviado:', comment);
  };


  return (
    <Contenedor>
      <Navbar />
      <Contenido>
        <div class="card">
          <div class="photo">
            <img
              src={
                movieData.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}`
                  : PosterNotFound
              }
              alt="Poster"
            />
          </div>
          <div class="description">
            <h1>{movieData.name || movieData.title}</h1>
            <h4>Título Original - {movieData.original_title || movieData.original_name}</h4>
            <h2>Valoración</h2>
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
            <h4>Popular House Plant</h4>
            <h1>$18</h1>
            <p>Classic Peace Lily is a spathiphyllum floor plant arranged in a bamboo planter with a blue & red ribbom and butterfly pick.</p>
            <button>Add to Cart</button>
            <button>Wishlist</button>
          </div>
        </div>
      </Contenido>
      <Footer></Footer>
    </Contenedor>
  )
}

const Contenedor = styled.div`
`
const Contenido = styled.div`
  padding: 35rem 2rem 3rem 3rem;

.card {

    /* width: 650px; */
    width: 80%;
    // height: 375px;
    position: absolute;
    background: white;
    margin: 0 auto;
    /* top: 55%; */
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    }

    .photo {
      padding: 30px;
      width: 45%;
      text-align: center;
      float: left;
      img {
        max-width: 90%;
      }

    }

    .description {
       padding: 30px;
       float: left;
       width: 55%;
       border-left: 2px solid #efefef;
       h1 {
         color: #515151;
         font-weight: 300;
         padding-top: 15px;
         margin: 0;
         font-size: 30px;
         font-weight: 300;
       }

       h2 {
        color: #515151;
        margin: 0;
        text-transform: uppercase;
        font-weight: 500;
       }

       h4 {
         margin: 0;
         color: #727272;
         text-transform: uppercase;
         font-weight: 500;
         font-size: 12px
       }

       p {
         font-size: 1rem;
         line-height: 20px;
         color: #727272;
         padding: 20px 0;
         margin: 0;
      }

       button {
         outline: 0;
         border: 0;
         background: none;
         border: 1px solid #d9d9d9;
         padding: 8px 0px;
         margin-bottom: 30px;
         color: #515151;
         text-transform: uppercase;
         width: 125px;
         font-family: inherit;
         margin-right: 5px;
         transition: all 0.3s ease;
         font-weight: 500;

         &:hover {

           // background: darken(white, 2%);
           border: 1px solid #aedaa6;
           color: #aedaa6;
           cursor: pointer;

         }

       }

    }

  }

`


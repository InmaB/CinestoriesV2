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


// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import Navbar from '../components/Navbar';
// import { onAuthStateChanged } from 'firebase/auth';
// import { firebaseAuth } from '../utils/firebase-config';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserFavoritas, removeMovieFromLiked } from '../store';
// import PosterNotFound from '../assets/posterNotFound.jpg';
// import { URL_TMBD, KEY_API, IMG_API } from '../utils/tmbd-config';
// import Footer from '../components/Footer';
// import { BiHappyHeartEyes } from 'react-icons/bi';


// export default function InfoPeli() {

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
//     if (email && movieData) { // Add movieData check
//       dispatch(getUserFavoritas(email)).then((favoritas) => {
//         const found = Array.isArray(favoritas) && favoritas.some((pelicula) => pelicula.id === movieData.id);
//         setIsInFavorites(found);
//       });
//     }
//   }, [email, dispatch, movieData]);


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

//   console.log(movieData);


//   return (
//     <Contenedor>
//       <Navbar />
//       <Contenido>
//         {movieData && (
//           <div className="card">
//             <div className="photo">
//               <img
//                 src={
//                   movieData.poster_path
//                     ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}`
//                     : PosterNotFound
//                 }
//                 alt="Poster"
//               />
//             </div>
//           </div>
//         )}

//         {movieData && (
//           <div className="description">
//             <h1>{movieData.name || movieData.title}</h1>
//             <h4>Título Original - {movieData.original_title || movieData.original_name}</h4>
//             <h2>Valoración:</h2>
//             <p>{movieData.vote_average}</p>
//             <h2>Año:</h2>
//             <p>{movieData.release_date && movieData.release_date.split('-')[0]}</p>
//             <h2>Sinopsis</h2>
//             <p>{movieData.overview}</p>
//             <h2>Género: </h2>
//             {/* <ul>
//               {movieData.genres.map((genre, index) => (
//                 <li key={index}>{genre}</li>
//               ))}
//             </ul> */}
//             <br /><br /> <br />
//             <button className='my-button' onClick={() => {
//               aniadirListaFav();
//               setShowMessage(true); // Mostrar el mensaje cuando se haga clic en el botón de añadir a favoritos
//             }} title="Añadir a favoritos">
//               <BiHappyHeartEyes className="icon-pull-right" />Añadir a Favoritas
//             </button>
//             <button>Wishlist</button>
//           </div>
//         )}
//       </Contenido>
//       <Footer></Footer>
//     </Contenedor>
//   );
// }

// const Contenedor = styled.div`
// `

// // const Contenido = styled.div`
// //   /* padding: 30rem 2rem 3rem 3rem; */
// //   margin-top: 25rem;

// // .card {

// //     /* width: 650px; */
// //     width: 80%;
// //      /* height: 500px; */
// //     position: absolute;
// //     background: white;
// //     margin: 0 auto;
// //     /* top: 55%; */
// //     left: 50%;
// //     transform: translate(-50%, -50%);
// //     box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
// //     transition: all 0.3s;

// //     &:hover {
// //       box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
// //     }

// //     .photo {
// //       padding: 30px;
// //       width: 45%;
// //       text-align: center;
// //       float: left;
// //       img {
// //         max-width: 90%;
// //       }

// //     }
// //     .my-button {
// //    width: 200px;
// //    padding: 15px;
// //    margin: 0 0 10px 0;
// //    text-align: left;
// //    display: block;
// // }


// // .icon-pull-right {
// //     float: right;
// //     font-size: 3rem;
// // }

// //     .description {
// //        padding: 30px;
// //        float: left;
// //        width: 55%;
// //        border-left: 2px solid #efefef;
// //        h1 {
// //          color: #515151;
// //          font-size:3rem;
// //          padding-top: 15px;
// //          margin: 0;
// //        }
// //        ul {
// //   list-style-type: none;
// // }

// // li {
// //   float: left;
// //   background-color: #aedaa6;
// //   padding: 10px;
// //   margin: 5px;
// // }

// //        h2 {
// //         font-size: 1rem;
// //         color: #515151;
// //         margin: 0;
// //         padding-top:15px;
// //         text-transform: uppercase;
// //         font-weight: 500;
// //        }

// //        h4 {
// //          margin: 0;
// //          color: #727272;
// //          text-transform: uppercase;
// //          font-weight: 500;
// //          font-size: 12px
// //        }

// //        p {
// //          font-size: 1rem;
// //          line-height: 20px;
// //          color: #727272;
// //          /* padding: 20px 0; */
// //          margin: 0;
// //          text-align:justify;
// //       }

// //        button {
// //          outline: 0;
// //          border: 0;
// //          background: none;
// //          border: 1px solid #d9d9d9;
// //          padding: 8px 0px;
// //          margin-bottom: 30px;
// //          color: #515151;
// //          text-transform: uppercase;
// //          width: 125px;
// //          font-family: inherit;
// //          margin-right: 5px;
// //          transition: all 0.3s ease;
// //          font-weight: 500;

// //          &:hover {

// //            // background: darken(white, 2%);
// //            border: 1px solid #aedaa6;
// //            color: #aedaa6;
// //            cursor: pointer;

// //          }

// //        }

// //     }

// //   }

// // `


import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getGenres, getUserFavoritas, getUserPendientes } from '../store';
import PosterNotFound from '../assets/posterNotFound.jpg';
import { URL_TMBD, KEY_API, IMG_API } from '../utils/tmbd-config';
import Footer from '../components/Footer';
import { BiHappyHeartEyes } from 'react-icons/bi';
import { BsCardChecklist } from 'react-icons/bs';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'

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
  const [message, setMessage] = useState('');

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
    dispatch(getGenres({ type: "movie" }));
  }, [])

  useEffect(() => {
    dispatch(getGenres({ type: "tv" }));
  }, [])

  // useEffect(() => {
  //   if (email && movieData) {
  //     dispatch(getUserFavoritas(email)).then((favoritas) => {
  //       const found = Array.isArray(favoritas) && favoritas.some((pelicula) => pelicula.id === movieData.id);
  //       setIsInFavorites(found);
  //     });
  //   }
  // }, [email, dispatch, movieData]);

  // useEffect(() => {
  //   if (email && movieData) {
  //     dispatch(getUserPendientes(email)).then((pendientes) => {
  //       const found = Array.isArray(pendientes) && pendientes.some((pelicula) => pelicula.id === movieData.id);
  //       setIsInFavorites(found);
  //     });
  //   }
  // }, [email, dispatch, movieData]);


  const aniadirListaFav = async () => {
    try {
      const { data: { movies: pendientes } } = await axios.get(`http://localhost:5000/api/user/pendientes/${email}`);
      const { data: { movies: favoritas } } = await axios.get(`http://localhost:5000/api/user/favoritas/${email}`);
      const isInPendientes = pendientes.some((movie) => movie.id === movieData.id);
      const isInFavoritas = favoritas.some((movie) => movie.id === movieData.id);

      if (isInPendientes) {
        setShowMessage(true);
        setMessage('La película ya está en la lista de pendientes');
      } else if (isInFavoritas) {
        setShowMessage(true);
        setMessage('La película ya está en la lista de favoritas');
      } else {
        await axios.post('http://localhost:5000/api/user/aniadirFav', {
          email,
          data: movieData,
        });
        setIsInFavorites(true);
        setShowMessage(true);
        setMessage('Añadida a favoritas correctamente');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const aniadirListaPendientes = async () => {
    try {
      const { data: { movies: pendientes } } = await axios.get(`http://localhost:5000/api/user/pendientes/${email}`);
      const { data: { movies: favoritas } } = await axios.get(`http://localhost:5000/api/user/favoritas/${email}`);
      const isInPendientes = pendientes.some((movie) => movie.id === movieData.id);
      const isInFavoritas = favoritas.some((movie) => movie.id === movieData.id);

      if (isInFavoritas) {
        setShowMessage(true);
        setMessage('La película ya está en la lista de favoritas');
      } else if (isInPendientes) {
        setShowMessage(true);
        setMessage('La película ya está en la lista de pendientes');
      } else {
        await axios.post('http://localhost:5000/api/user/aniadirPendientes', {
          email,
          data: movieData,
        });
        setShowMessage(true);
        setMessage('Añadida a pendientes correctamente');
      }
    } catch (err) {
      console.log(err);
    }
  };



  const navigateBack = () => {
    navegacion(-1);
  };

  return (
    <Contenedor>
      <Navbar />
      <Contenido>

        {movieData && (
          <CardContainer>
            <div className="card">
              <div className="photo">
                <img
                  src={
                    movieData.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}`
                      : PosterNotFound
                  }
                  alt="Poster"
                />
              </div>
              <div className="description">
                <h1>{movieData.name || movieData.title}</h1>
                <h4>Título Original - {movieData.original_title || movieData.original_name}</h4>
                <h2>Valoración:</h2>
                <p>{movieData.vote_average}</p>
                <h2>Año:</h2>
                <p>{movieData.release_date && movieData.release_date.split('-')[0]}</p>
                <h2>Sinopsis</h2>
                <p>{movieData.overview}</p>

                <h2>Género:</h2>
                <div className="genre-container">
                  {movieData && movieData.genres && movieData.genres.length > 0 ? (
                    <ul className="genre-list">
                      {movieData.genres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No se encontraron géneros</p>
                  )}
                </div>

                <div className="button-container">
                  <button className="my-button" onClick={() => {
                    aniadirListaFav();
                  }} title="Añadir a favoritas">
                    <BiHappyHeartEyes className="icon-pull-right" />Añadir a favoritas
                  </button>
                  <button className="my-button" onClick={() => {
                    aniadirListaPendientes();
                  }} title="Añadir a pendientes">
                    <BsCardChecklist />Añadir a pendientes
                  </button>
                </div>

                {showMessage && <p>{message}</p>}
              </div>
            </div>
          </CardContainer>
        )}

      </Contenido>
      <BackButton onClick={navigateBack}>
        <BsFillArrowLeftSquareFill title='atras' />
      </BackButton>
      <Footer></Footer>
    </Contenedor>
  );
}

const Contenedor = styled.div``;


const Contenido = styled.div`
  margin-top: 3rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;

  .card {
    width: 80%;
    background: white;
    border-radius:1rem;
    box-shadow: 0 2px 5px 0 rgba(55, 136, 30, 0.846), 0 2px 10px 0 rgba(170, 22, 22, 0.737);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 8px 17px 0 rgb(103, 104, 103), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .photo {
      padding: 30px;
      width: 45%;
      text-align: center;
      float: left;

      img {
        max-width: 90%;
        border-radius: 5px;
      }
    }

    .description {
      border-left: 2px solid #efefef;
      padding: 30px;
      overflow: auto;

      h1 {
        color: rgb(48, 50, 62);
        font-size: 3rem;
        padding-top: 15px;
        margin: 0;
      }

      h2 {
        font-size: 1rem;
        color: #515151;
        margin: 0;
        padding-top: 15px;
        text-transform: uppercase;
        font-weight: 500;
      }

      h4 {
        margin: 0;
        color: #727272;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 12px;
      }

      p {
        font-size: 1rem;
        line-height: 20px;
        color: #727272;
        margin: 0;
        text-align: justify;
      }

      .genre-container {
        margin-bottom: 1rem;

        .genre-list {
          display: flex;
          flex-wrap: wrap;
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        ul {
          list-style-type: none;
        }

        li {
          float: left;
          border-radius:1rem;
          color: #aedaa6;
          background-color: white;
          border: 1px solid #aedaa6;
          padding: 10px;
          margin: 5px;
          margin-right: 1rem;
        }
      }

      .button-container {

        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
      }

      button {
        outline: 0;
        border: 0;
        background: none;
        border: 1px solid lime;
        padding: 8px 0px;
        color: #02a002;
        text-transform: uppercase;
        width: 125px;
        font-family: inherit;
        margin-right: 5px;
        transition: all 0.3s ease;
        font-weight: 500;
        margin-bottom: 2rem;
        margin-right: 1rem;

        &:hover {
          border: 1px solid #aedaa6;
          color: #aedaa6;
          cursor: pointer;
        }
      }
    }
  }
`;

const BackButton = styled.button`
  position: relative;
  bottom: 100px;
  left: 220px;
  background-color: transparent;
  border: none;
  font-size: 5rem;
  cursor: pointer;
  color: lime;
:hover {
  color: #01b801;
}
`;
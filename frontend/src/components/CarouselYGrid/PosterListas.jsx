// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import styled from 'styled-components'
// import { BsCheck } from "react-icons/bs"
// import { AiOutlinePlus } from "react-icons/ai"



// export default function PosterListas({ movieData, fav = false }) {
//   const [isHover, sertHover] = useState(false)
//   const navegacion = useNavigate()
//   const [email, setEmail] = useState(undefined)

//   // onAuthStateChanged(firebaseAuth, (Usuario) => {

//   //   if (Usuario) setEmail(Usuario.email)
//   //   else navegacion("/login")
//   // });




//   return (
//     <Contenedor>
//       <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="poster" />
//       {isHover && (
//         <div className="hover">

//           <div className="info-container flex column">
//             <h3 className="name" onClick={() => navegacion("/reproductor")}> {movieData.name}</h3>
//             <div className="icons flex j-between">


//               {
//                 fav ? (
//                   <BsCheck title='Remove from list'></BsCheck>
//                 ) : (
//                   <AiOutlinePlus title='Add to my list'></AiOutlinePlus>
//                 )}
//             </div>

//           </div>

//         </div>
//       )}
//     </Contenedor>
//   );
// }

// const Contenedor = styled.div`
// max-width: 230px;
//   width: 230px;
//   height: 100%;
//   cursor: pointer;
//   position: relative;
//   img {
//     border-radius: 0.2rem;
//     width: 100%;
//     height: 100%;
//     z-index: 10;
//   }
//   .hover {
//     z-index: 99;
//     height: max-content;
//     width: 10rem;
//     position: absolute;
//     top: -18vh;
//     left: 0;
//     border-radius: 0.3rem;
//     box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
//     background-color: #181818;
//     transition: 0.3s ease-in-out;
//     .image-video-container {
//       position: relative;
//       height: 140px;
//       img {
//         width: 100%;
//         height: 140px;
//         object-fit: cover;
//         border-radius: 0.3rem;
//         top: 0;
//         z-index: 4;
//         position: absolute;
//       }
//       video {
//         display: none;
//         width: 100%;
//         height: 140px;
//         object-fit: cover;
//         border-radius: 0.3rem;
//         top: 0;
//         z-index: 5;
//         position: absolute;
//       }
//     }
//     .info-container {
//       padding: 1rem;
//       gap: 0.5rem;
//     }
//     .icons {
//       .controls {
//         display: flex;
//         gap: 1rem;
//       }
//       svg {
//         font-size: 2rem;
//         cursor: pointer;
//         transition: 0.3s ease-in-out;
//         &:hover {
//           color: #b8b8b8;
//         }
//       }
//     }
//     .genres {
//       ul {
//         gap: 1rem;
//         li {
//           padding-right: 0.7rem;
//           &:first-of-type {
//             list-style-type: none;
//           }
//         }
//       }
//     }
//   }`


// import styled from 'styled-components';
// import { URL_TMBD, KEY_API, IMG_API } from '../../utils/tmbd-config';
// import { useEffect, useState } from 'react';
// import PosterNotFound from '../../assets/posterNotFound.jpg'
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMovies, fetchPelis, getGenres } from '../../store/index';
// import { onAuthStateChanged } from 'firebase/auth';
// import { firebaseAuth } from '../../utils/firebase-config';
// import { AiFillDelete } from 'react-icons/ai';
// import { removeMovieFromLiked } from '../../store/index';




// export default function PosterPanel({ movieData }) {
//   const navegacion = useNavigate()
//   const dispatch = useDispatch()
//   const [isHover, sertHover] = useState(false)

//   const [email, setEmail] = useState(undefined)

//   const handleDelete = async () => {
//     try {
//       await dispatch(removeMovieFromLiked({ movieId: movieData.id, email }));
//       // Realizar cualquier acción adicional después de eliminar la película, como actualizar el estado o mostrar un mensaje de éxito.
//     } catch (error) {
//       console.log(error);
//       // Manejar cualquier error de eliminación aquí.
//     }
//   };

//   const handleClick = () => {
//     navegacion('/infoPeli', { state: movieData });
//   };


//   onAuthStateChanged(firebaseAuth, (Usuario) => {

//     if (Usuario) setEmail(Usuario.email)
//     else navegacion("/login")
//   });

//   return (
//     <CajaPoster>
//       <ImagenPoster
//         src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}` : PosterNotFound}
//         alt="Poster22"
//         onClick={handleClick}
//       />

//       <TextOverlay>
//         <Text>{movieData.name}</Text>
//         <button onClick={handleDelete}>
//           <AiFillDelete />
//         </button>
//       </TextOverlay>
//     </CajaPoster>
//   );
// }

// const TextOverlay = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: rgba(0, 0, 0, 0.7);
//   color: #fff;
//   font-size: 0.9rem;
//   font-weight: bold;
//   padding: 5px;
//   opacity: 0;
//   transition: opacity 0.3s ease;

// `;

// const CajaPoster = styled.div`
//   align-items: center;
//   text-align: center;
//   position: relative;

//   &:hover ${TextOverlay} {
//     opacity: 1;
//   }


//   @media (max-width: 768px) {
//     flex-direction: row;
//     align-items: flex-start;
//     text-align: left;
//   }
// `;

// const ImagenPoster = styled.img`
//   width: 100%;
//   height: 90%;
//   box-shadow: 0 5px 10px black;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: transform 0.3s ease;

//   &:hover {
//     border: 3px solid lime;
//   }


//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const Text = styled.div``;


import styled from 'styled-components';
import { URL_TMBD, KEY_API, IMG_API } from '../../utils/tmbd-config';
import { useEffect, useState } from 'react';
import PosterNotFound from '../../assets/posterNotFound.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchPelis, getGenres } from '../../store/index';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../utils/firebase-config';
import { AiFillDelete } from 'react-icons/ai';
import { removeMovieFromLiked } from '../../store/index';

export default function PosterPanel({ movieData }) {
  const navegacion = useNavigate();
  const dispatch = useDispatch();
  const [isHover, setHover] = useState(false);

  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (Usuario) => {
      if (Usuario) setEmail(Usuario.email);
      else navegacion('/login');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async () => {
    try {
      await dispatch(removeMovieFromLiked({ movieId: movieData.id, email }));
      // Realizar cualquier acción adicional después de eliminar la película, como actualizar el estado o mostrar un mensaje de éxito.
    } catch (error) {
      console.log(error);
      // Manejar cualquier error de eliminación aquí.
    }
  };

  const handleClick = () => {
    navegacion('/infoPeli', { state: movieData });
  };

  return (
    <CajaPoster>
      <ImagenPoster
        src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${IMG_API}${movieData.poster_path}` : PosterNotFound}
        alt="Poster22"
        onClick={handleClick}
      />

      <TextOverlay>
        <Text>{movieData.name}</Text>
        <button onClick={handleDelete}>
          <AiFillDelete />
        </button>
      </TextOverlay>
    </CajaPoster>
  );
}

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const CajaPoster = styled.div`
  align-items: center;
  text-align: center;
  position: relative;

  &:hover ${TextOverlay} {
    opacity: 1;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Text = styled.div``;


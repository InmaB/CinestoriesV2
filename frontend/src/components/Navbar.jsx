// import React, { useState } from 'react';
// import styled from "styled-components";
// import logo from "../assets/logo.png";
// import { firebaseAuth } from "../utils/firebase-config";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { Link, useNavigate } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import { AiFillHome, AiOutlineCheckCircle, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import { BiCameraMovie, BiMoviePlay } from "react-icons/bi";
// import { MdFavorite } from "react-icons/md";
// import { SlScreenDesktop } from "react-icons/sl";
// import { useDispatch } from 'react-redux';
// import { searchMovies } from '../store';

// export default function Navbar() {
//   const navegacion = useNavigate();

//   const links = [
//     { ico: AiFillHome, name: "Inicio", link: "/" },
//     { ico: BiCameraMovie, name: "Pelis", link: "/peliculas" },
//     { ico: SlScreenDesktop, name: "Series & Tv", link: "/seriestv" },
//     { ico: MdFavorite, name: "Favoritas", link: "/listaFavoritas" },
//     { ico: AiOutlineCheckCircle, name: "Pendientes", link: "/listaPendientes" },
//   ];

//   onAuthStateChanged(firebaseAuth, (Usuario) => {
//     if (!Usuario) navegacion("/login");
//   });

//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchType, setSearchType] = useState("movie"); // Valor inicial: "movie"

//   const handleSearch = () => {
//     // Dispatch de la acción de búsqueda
//     dispatch(searchMovies({ searchQuery, type: searchType }));
//   };

//   const [menuOpen, setMenuOpen] = useState(false);


//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <Nav isOpen={isOpen}>
//       <div className="flex a-center">
//         <div className="logo">
//           <a href='/' >
//             <img src={logo} alt="logo" /></a>
//         </div>
//         <div className="menu-icon" onClick={toggleMenu}>
//           {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//         </div>

//         <ul className="menu">
//           {links.map(({ ico: Icon, name, link }) => (
//             <li key={name}>
//               <Link to={link}>
//                 {Icon && <Icon />} {name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//         <div className="dcha">
//           <div className="buscador">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Buscar..."
//             />
//             <select
//               value={searchType}
//               onChange={(e) => setSearchType(e.target.value)}
//             >
//               <option value="movie">Películas</option>
//               <option value="tv">Series & Tv</option>
//             </select>
//             <button onClick={handleSearch}>
//               <FaSearch />
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={() => {
//                 alert("saliendo");
//                 signOut(firebaseAuth);
//               }}
//             >
//               Salir
//             </button>
//           </div>
//         </div>
//       </div>
//     </Nav>
//   );
// }

// const Nav = styled.nav`
//   box-shadow: 0 3px 3px black;
//   top: 0;
//   background-color: #1a1d29;
//   height: 4.5rem;
//   width: 100%;
//   z-index: 2;
//   padding: 0.3rem;
//   justify-content: space-between;
//   position: fixed;
//   align-items: center;



//     .logo {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       img {
//         margin-left: 2rem;
//         margin-right:2rem;
//         height: 4rem;
//       }
//     }

//   .menu-icon {
//     font-size: 24px;
//     cursor: pointer;

//      @media (min-width: 768px) {
//        display: none;
//     }
//   }

//   .menu {
//     display: flex;
//     align-items: center;
//     /* gap: 2; */

//      @media (max-width: 767px) {
//        display: none;
//      }

//     li {
//       list-style: none;
//       margin-left: 20px;
//       margin: 1rem;

//       a {
//         text-decoration: none;
//         color: #fff;
//         font-weight: bold;
//         transition: color 0.2s ease-in;

//         &:hover {
//           color: lime;
//         }
//       }
//     }
//   }
// .dcha {margin-left: auto;}
//   .buscador {
//     color: white;
//     display: flex;
//     align-items: center;
//     gap: 1rem;

//     input[type="text"] {
//       width: 90%;
//       font-size: 1rem;
//       padding: 0.3rem;
//       border: none;
//       border-radius: 4px;
//       border: 2px solid white;
//       background-color: #1a1d29;
//       color: white;
//       ::placeholder {
//         color: white;
//       }
//     }
//         @media (max-width: 767px) {
//        display: none;
//     }

//     button {
//       background: none;
//       border: none;
//       color: white;
//       cursor: pointer;
//       transition: color 0.2s ease-in;

//       &:hover {
//         color: lime;
//       }
//     }

//     select {
//       font-size: 1rem;
//       padding: 0.3rem;
//       border-radius: 4px;
//       border: 2px solid white;
//       background-color: #1a1d29;
//       color: white;
//     }

//     @media (max-width: 767px) {
//       display: none;
//     }
//   }

//      .btn {
//    color: white;
//    font-size: 1rem;
//   font-weight: bold;
//    text-transform: uppercase;
//    letter-spacing: 2px;
//    /* display: flex; */
//   align-items: center;
//   gap: 2rem;
//   padding: 12px 22px;
//    border: 2px solid rebeccapurple;
//    border-radius: 50px;
//   transition: 0.15s ease;
//  }

//  .btn-primary { background: #1a1d29; }

//  .btn-primary:is(:hover, :focus) {
//    background: lime;
//    color: #1a1d29;
//  }

//   @media (max-width: 767px) {
//     .menu-dropdown {
//       flex-direction: column;
//       background-color: #1a1d29;
//       position: absolute;
//       top: 70px;
//       left: 0;
//       right: 0;
//       padding: 20px;
//       z-index: 3;
//     @media (max-width: 767px) {
//        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
//     }

//       li {
//         list-style: none;
//         margin-bottom: 10px;
//       }

//       a {
//         text-decoration: none;
//         color: #fff;
//         font-weight: bold;
//         transition: color 0.2s ease-in;

//         &:hover {
//           color: lime;
//         }
//       }
//     }
//   }
// `;


import React, { useState } from 'react';
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiFillHome, AiOutlineCheckCircle, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiCameraMovie, BiMoviePlay } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { useDispatch } from 'react-redux';
import { searchMovies } from '../store';
import Buscador from './Buscador';

export default function Navbar() {
  const navegacion = useNavigate();

  const links = [
    { ico: AiFillHome, name: "Inicio", link: "/" },
    { ico: BiCameraMovie, name: "Pelis", link: "/peliculas" },
    { ico: SlScreenDesktop, name: "Series & Tv", link: "/seriestv" },
    { ico: MdFavorite, name: "Favoritas", link: "/listaFavoritas" },
    { ico: AiOutlineCheckCircle, name: "Pendientes", link: "/listaPendientes" },
  ];

  onAuthStateChanged(firebaseAuth, (Usuario) => {
    if (!Usuario) navegacion("/login");
  });

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("movie"); // Valor inicial: "movie"

  const handleSearch = () => {
    // Dispatch de la acción de búsqueda
    dispatch(searchMovies({ searchQuery, type: searchType }));
  };

  const [menuOpen, setMenuOpen] = useState(false);


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav isOpen={isOpen}>
      <div className="flex a-center">
        <div className="logo">
          <a href='/' >
            <img src={logo} alt="logo" /></a>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>

        <ul className="menu">
          {links.map(({ ico: Icon, name, link }) => (
            <li key={name}>
              <Link to={link}>
                {Icon && <Icon />} {name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="dcha">
          <div className="buscador">
            {/* <Buscador></Buscador> */}


            <button
              className="btn btn-primary"
              onClick={() => {
                alert("saliendo");
                signOut(firebaseAuth);
              }}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  box-shadow: 0 3px 3px black;
  top: 0;
  background-color: #1a1d29;
  height: 4.5rem;
  width: 100%;
  z-index: 2;
  padding: 0.3rem;
  justify-content: space-between;
  position: fixed;
  align-items: center;



    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-left: 2rem;
        margin-right:2rem;
        height: 4rem;
      }
    }

  .menu-icon {
    font-size: 24px;
    cursor: pointer;

     @media (min-width: 768px) {
       display: none;
    }
  }

  .menu {
    display: flex;
    align-items: center;
    /* gap: 2; */

     @media (max-width: 767px) {
       display: none;
     }

    li {
      list-style: none;
      margin-left: 20px;
      margin: 0.8rem;
      text-transform: uppercase;
      font-size:1.1rem;

      a {
        /* text-decoration: none;
        color: #fff;
        letter-spacing:0.1rem;
        transition: color 0.2s ease-in;
        position: relative; */

        position: relative;
overflow: hidden;
display: inline-block;
text-decoration: none;
color: white;
transition: color 0.2s ease-in;
      }

      a:hover {
  color: lime;
}

a:after {
content: "";
position: absolute;
bottom: 0;
left: -100%;
width: 100%;
height: 2px;
background: lime;
transition: left .4s;
}
a:hover:after {
left: 0;
}
        /* &:hover {
          color: lime;
        } */

    }
  }
.dcha {margin-left: auto;}
  .buscador {
    color: white;
    display: flex;
    align-items: center;
    gap: 1rem;

    input[type="text"] {
      width: 90%;
      font-size: 1rem;
      padding: 0.3rem;
      border: none;
      border-radius: 4px;
      border: 2px solid white;
      background-color: #1a1d29;
      color: white;
      ::placeholder {
        color: white;
      }
    }
        @media (max-width: 767px) {
       display: none;
    }

    button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      transition: color 0.2s ease-in;

      &:hover {
        color: lime;
      }
    }

    select {
      font-size: 1rem;
      padding: 0.3rem;
      border-radius: 4px;
      border: 2px solid white;
      background-color: #1a1d29;
      color: white;
    }

    @media (max-width: 767px) {
      display: none;
    }
  }

     .btn {
   color: white;
   font-size: 1rem;
  font-weight: bold;
   text-transform: uppercase;
   letter-spacing: 2px;
   /* display: flex; */
  align-items: center;
  gap: 2rem;
  padding: 12px 22px;
   border: 2px solid rebeccapurple;
   border-radius: 50px;
  transition: 0.15s ease;
 }

 .btn-primary { background: #1a1d29; }

 .btn-primary:is(:hover, :focus) {
   background: lime;
   color: #1a1d29;
 }

  @media (max-width: 767px) {
    .menu-dropdown {
      flex-direction: column;
      background-color: #1a1d29;
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      padding: 20px;
      z-index: 3;
    @media (max-width: 767px) {
       display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    }

      li {
        list-style: none;
        margin-bottom: 10px;
      }

      a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        transition: color 0.2s ease-in;

        &:hover {
          color: lime;
        }
      }
    }
  }
`;

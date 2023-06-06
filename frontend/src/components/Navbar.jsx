import React, { useState } from 'react';
import styled from "styled-components";
import logo from "../assets/logo.png";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineCheckCircle, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { firebaseAuth } from "../utils/firebase-config";
import UserProfile from './UserProfile';

export default function Navbar() {
  // Se declara funciones propias de react
  const navegacion = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Matriz de enlaces del menú
  const links = [
    { ico: AiFillHome, name: "Inicio", link: "/" },
    { ico: BiCameraMovie, name: "Pelis", link: "/peliculas" },
    { ico: SlScreenDesktop, name: "Series & Tv", link: "/seriestv" },
    { ico: MdFavorite, name: "Favoritas", link: "/listaFavoritas" },
    { ico: AiOutlineCheckCircle, name: "Pendientes", link: "/listaPendientes" },
  ];

  // Verifica si hay un usuario autenticado.
  onAuthStateChanged(firebaseAuth, (Usuario) => {
    if (!Usuario) navegacion("/login");
  });

  const toggleMenu = () => {
    console.log('Toggle menu');
    setIsOpen(!isOpen);
  };


  return (
    <Nav isOpen={isOpen}>
      <div className="flex a-center">
        <div className="logo">
          <a href='/' >
            <img src={logo} alt="logo" />
          </a>
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
          <UserProfile></UserProfile>
          <div className="buscador">
          </div>
        </div>
      </div>
    </Nav>
  );
}

// Estilos
const Nav = styled.nav`
  box-shadow: 0 3px 3px black;
  top: 0;
  background-color: #1a1d29;
  height: 4.5rem;
  width: 100%;
  z-index: 2;
  padding: 0.3rem;
  justify-content: space-between;
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

    @media (max-width: 767px) {
      display: block;
      position: absolute;
      top: 4.5rem;
      left: 0;
      width: 100%;
      background-color: #1a1d29;
      padding: 1rem;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s ease-in;

      &.open {
        visibility: visible;
        opacity: 1;
      }

      ul {
        li {
          margin-bottom: 0.5rem; // Reduce el espacio entre los elementos de la lista
        }

        a {
          display: block; // Muestra los enlaces en forma de lista vertical
          padding: 0.5rem 0; // Añade espaciado vertical a los enlaces
        }
      }
     }

    li {
      list-style: none;
      margin-left: 20px;
      margin: 0.8rem;
      text-transform: uppercase;
      font-size:1.1rem;

      a {
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
    }
  }
.dcha {
  margin-left: auto;
  margin-right:2rem;
}

`;


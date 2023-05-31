import React, { useState } from 'react';
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineCheckCircle, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiCameraMovie, BiExit } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";

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
            <button
              className="btn-salir" title='Salir'
              onClick={() => {
                alert("saliendo");
                signOut(firebaseAuth);
              }}
            >
              <BiExit />
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
.dcha {margin-left: auto;}

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

  .btn-salir {
    margin-right:1rem;
    color: white;
    font-size: 2rem;
    align-items: center;
    transition: 0.15s ease;
}


`;

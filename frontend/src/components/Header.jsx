import React from 'react'
import styled from 'styled-components'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'


export default function Header(props) {
  // UseNavigate() es de la librería React Router. Esta función permite navegar a diferentes rutas de la aplicación.
  const navegacion = useNavigate();
  return (
    <Contenedor className='flex a-center j-between'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navegacion(props.login ? "/login" : "/registro")}>
        {props.login ? "Loggearse" : "Registrarse"}</button>
    </Contenedor>
  )
}

const Contenedor = styled.div`
padding: 0 4rem;
.logo {
  img {
  height: 5rem;
  }
}
  button {
    padding: 0.5rem 1rem;
    background-color: #382933;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
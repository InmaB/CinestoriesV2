import React, { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import styled from "styled-components"
import ImagenBackground from "../components/ImagenBackground"
import Header from "../components/Header"
import { useNavigate } from 'react-router-dom'

export default function Registro() {
  const navegacion = useNavigate();
  //useState de React crea un estado de componente llamado valoresFormulario, que es un objeto con dos propiedades, email y password, ambos inicializados con una cadena vacía.
  const [valoresFormulario, setvaloresFormulario] = useState({
    email: "",
    password: "",
  });

  // Función asíncrona que maneja la creación de un nuevo usuario a través de Firebase.
  const nuevoUsuario = async () => {
    try {
      const { email, password } = valoresFormulario;
      //createUserWithEmailAndPassword método propio de Firebase
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
    } catch (err) {
      console.log(err);
    }
  }

  //  se utiliza para redirigir al usuario a una página específica después de que se haya autenticado en la aplicación. Cuando se produce un cambio en el estado de autenticación del usuario, se comprueba si hay un usuario autenticado y se redirige a la página especificada si es así.
  onAuthStateChanged(firebaseAuth, (Usuario) => {
    //si
    if (Usuario) navegacion("/");
  });

  return (
    <Contenedor>
      <ImagenBackground></ImagenBackground>
      <div className="contenido">
        <Header login></Header>
        <div className="body flex column a-center j-center">
          <div className="text flex colum">
            <h1>Peliculas y series</h1>
            <h4>asdklfjdlsjfd</h4>
            <h6>Prueba</h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder='Email'
              name='email'
              value={valoresFormulario.email}
              onChange={(e) =>
                setvaloresFormulario({
                  ...valoresFormulario,
                  [e.target.name]: e.target.value,
                })
              }></input>
            <input type="password" placeholder='Password' name='password'
              value={valoresFormulario.password}
              onChange={(e) =>
                setvaloresFormulario({
                  ...valoresFormulario,
                  [e.target.name]: e.target.value,
                })
              } />
          </div>
          <button onClick={nuevoUsuario}>Registrarse</button>
        </div>
      </div>
    </Contenedor>
  );
}

// El contenedro tendrá los estilos siguientes
const Contenedor = styled.div`
  position: relative;
  .contenido{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;

        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

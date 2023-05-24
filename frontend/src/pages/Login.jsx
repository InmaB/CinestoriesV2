import React, { useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import styled from "styled-components"
import ImagenBackground from "../components/ImagenBackground"
import Header from "../components/Header"
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navegacion = useNavigate();
  //useState de React crea un estado de componente llamado valoresFormulario, que es un objeto con dos propiedades, email y password, ambos inicializados con una cadena vacía.
  const [valoresFormulario, setvaloresFormulario] = useState({
    email: "",
    password: "",
  });

  // Función asíncrona que maneja la creación de un nuevo usuario a través de Firebase.
  const sesion = async () => {
    try {
      const { email, password } = valoresFormulario;
      //createUserWithEmailAndPassword método propio de Firebase
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    } catch (err) {
      console.log(err);
    }
  }

  //  se utiliza para redirigir al usuario a una página específica después de que se haya autenticado en la aplicación. Cuando se produce un cambio en el estado de autenticación del usuario, se comprueba si hay un usuario autenticado y se redirige a la página especificada si es así.
  onAuthStateChanged(firebaseAuth, (Usuario) => {

    if (Usuario) navegacion("/");
  });

  return (
    <Contenedor>
      <ImagenBackground></ImagenBackground>
      <div className="contenido">
        <Header></Header>
        <div className="form-container flex-column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h2>Login</h2>
            </div>
            <div className="contenido flex column">
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
              <button onClick={sesion}>Iniciar sesión</button>
            </div>
          </div>
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
    height: 25vh;
    width: 25vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container{
      gap: 2rem;
      height: 85vh;
      .form {
        /* display: grid; */

        width: 25vw;
        input {
          gap: 2rem;
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
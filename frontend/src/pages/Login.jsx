import React, { useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Login() {
  const navegacion = useNavigate();
  const [valoresFormulario, setvaloresFormulario] = useState({
    email: '',
    password: '',
  });
  const [mensajeError, setMensajeError] = useState('');

  const sesion = async () => {
    try {
      const { email, password } = valoresFormulario;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      setMensajeError('Inicio de sesión incorrecto');
      console.log(err);
    }
  }

  onAuthStateChanged(firebaseAuth, (Usuario) => {
    if (Usuario) navegacion('/');
  });

  return (
    <Contenedor>

      <div className="contenido">
        <Header />
        <div className="form-container flex-column a-center j-center">
          <div className="logo flex a-center">
            <img src={logo} alt="Logo" />
          </div>
          <div className="form">
            <div className="title">
              <h3>Iniciar sesión</h3>
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
                }
              />
              <input
                type="password"
                placeholder='Password'
                name='password'
                value={valoresFormulario.password}
                onChange={(e) =>
                  setvaloresFormulario({
                    ...valoresFormulario,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {mensajeError && <p className="error">{mensajeError}</p>}
              <button onClick={sesion}>Iniciar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .contenido {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%; /* Ancho máximo del formulario */

    .logo {
      img {
        height: 9rem;
      }
    }

    .form {
      width: 100%;

      input {
        color: black;
        border: none;
        padding: 1rem;
        font-size: 1rem;
        border: 1px solid black;
        &:focus {
          outline: none;
        }
      }

      button {
        width: 100%;
        margin-top: 2rem;
        padding: 0.5rem 1rem;
        background-color: black;
        border: none;
        cursor: pointer;
        color: white;
        font-weight: bolder;
        font-size: 1rem;
        :hover {
          background-color: lime;
          color: black;
        }
      }

      .error {
        background-color: red;
        padding: 5px;
        color: white;
        margin-top: 1rem;
      }
    }
  }
`;

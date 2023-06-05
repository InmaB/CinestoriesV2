// import React, { useState } from 'react'
// import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
// import { firebaseAuth } from "../utils/firebase-config"
// import styled from "styled-components"
// import Header from "../components/Header"
// import { useNavigate } from 'react-router-dom'

// export default function Registro() {
//   const navegacion = useNavigate();
//   //useState de React crea un estado de componente llamado valoresFormulario, que es un objeto con dos propiedades, email y password, ambos inicializados con una cadena vacía.
//   const [valoresFormulario, setvaloresFormulario] = useState({
//     email: "",
//     password: "",
//   });

//   // Función asíncrona que maneja la creación de un nuevo usuario a través de Firebase.
//   const nuevoUsuario = async () => {
//     try {
//       const { email, password } = valoresFormulario;
//       //createUserWithEmailAndPassword método propio de Firebase
//       await createUserWithEmailAndPassword(firebaseAuth, email, password)
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   //  se utiliza para redirigir al usuario a una página específica después de que se haya autenticado en la aplicación. Cuando se produce un cambio en el estado de autenticación del usuario, se comprueba si hay un usuario autenticado y se redirige a la página especificada si es así.
//   onAuthStateChanged(firebaseAuth, (Usuario) => {
//     //si
//     if (Usuario) navegacion("/");
//   });

//   return (
//     <Contenedor>
//       <div className="contenido">
//         <Header login></Header>
//         <div className="body flex column a-center j-center">
//           <div className="text flex colum">
//             <h1>Peliculas y series</h1>
//             <h4>asdklfjdlsjfd</h4>
//             <h6>Prueba</h6>
//           </div>
//           <div className="form">
//             <input
//               type="email"
//               placeholder='Email'
//               name='email'
//               value={valoresFormulario.email}
//               onChange={(e) =>
//                 setvaloresFormulario({
//                   ...valoresFormulario,
//                   [e.target.name]: e.target.value,
//                 })
//               }></input>
//             <input type="password" placeholder='Password' name='password'
//               value={valoresFormulario.password}
//               onChange={(e) =>
//                 setvaloresFormulario({
//                   ...valoresFormulario,
//                   [e.target.name]: e.target.value,
//                 })
//               } />
//           </div>
//           <button onClick={nuevoUsuario}>Registrarse</button>
//         </div>
//       </div>
//     </Contenedor>
//   );
// }

// // El contenedro tendrá los estilos siguientes
// const Contenedor = styled.div`

// `;


import React, { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const navegacion = useNavigate();
  const [valoresFormulario, setvaloresFormulario] = useState({
    email: '',
    password: '',
  });
  const [mensajeError, setMensajeError] = useState('');

  const nuevoUsuario = async () => {
    try {
      const { email, password } = valoresFormulario;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      setMensajeError('Error al registrar nuevo usuario');
      console.log(err);
    }
  }

  onAuthStateChanged(firebaseAuth, (Usuario) => {
    if (Usuario) navegacion('/');
  });

  return (
    <Contenedor>
      <div className="contenido">
        <Header login></Header>
        <div className="body flex column a-center j-center">
          <div className="text flex colum">
            <h3>Peliculas y series</h3>

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
          </div>
          <button onClick={nuevoUsuario}>Registrarse</button>
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
    max-width: 100%;

    .body {
      /* Estilos para el cuerpo */
      display: flex;
      flex-direction: column;
      align-items: center;

      .text {
        /* Estilos para el texto */
        display: flex;
        flex-direction: column;
        align-items: center;

      }

      .form {
        /* Estilos para el formulario */
        display: flex;
        flex-direction: column;
        align-items: center;

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

      .error {
        background-color: red;
        padding: 5px;
        color: white;
        margin-top: 1rem;
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
    }
  }
`;

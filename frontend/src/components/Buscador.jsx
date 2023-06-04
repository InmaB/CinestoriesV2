// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getGenres, searchMovies } from "../store";
// import Modal from "./Modal";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import GridResultados from '../components/CarouselYGrid/GridResultados';
// import RiseLoader from 'react-spinners/RiseLoader';

// const Buscador = () => {
//     const dispatch = useDispatch();
//     const [searchQuery, setSearchQuery] = useState("");
//     const searchResults = useSelector((state) => state.cinestories.resultados);
//     const [type, setType] = useState("movie");
//     const [modalOpen, setModalOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [isLoading, setIsLoading] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         dispatch(getGenres());
//     }, []);

//     const handleClick = (movie) => {
//         navigate('/infoPeli', { state: movie });
//     };

//     useEffect(() => {
//         setTimeout(() => {
//             setLoading(false);
//         }, 2000);
//     }, []);

//     const handleSearch = () => {
//         if (searchQuery) {
//             dispatch(searchMovies({ searchQuery, type }));
//             setModalOpen(true);
//         }
//     };

//     const closeModal = () => {
//         setModalOpen(false);
//     };

//     return (
//         <Contenedor>
//             <input
//                 type="text"
//                 placeholder="Buscador"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <select value={type} onChange={(e) => setType(e.target.value)}>
//                 <option value="movie">Películas</option>
//                 <option value="tv">Series de TV</option>
//             </select>
//             <button onClick={handleSearch}>Buscar</button>

//             <Modal open={modalOpen} onClose={closeModal} loading={isLoading}>
//                 <div className="modal-contenido">
//                     {loading ? ( // Mostrar el spinner mientras se realiza la búsqueda
//                         <SpinnerContainer>
//                             <RiseLoader color='lime' />
//                         </SpinnerContainer>
//                     ) : searchResults.length === 0 ? (
//                         <p>No se encontraron resultados</p>
//                     ) : (
//                         <>
//                             <GridResultados searchResults={searchResults} />
//                         </>
//                     )}
//                 </div>
//             </Modal>
//         </Contenedor>
//     );
// };

// export default Buscador;

// const Contenedor = styled.div`
//   display: flex;
//   /* flex-direction: column; */
//   align-items: center;
//   justify-content: center;
// margin-bottom: 2rem;

// h1 {
// margin-right: 5px;
// }
//   input {
//     padding: 4px;
//     margin-right: 5px;
//     background-color: #1a1d29;
//     color: whitesmoke;
//     /* border-radius: 10px; */
//     border: 2px solid whitesmoke;
//     ::placeholder { color: rgb(128, 134, 167)}
//   }
//   select {
//     padding: 5px;
//     margin-right: 5px;
//     background-color: #1a1d29;
//     /* border-radius: 10px; */
//     border: 2px solid whitesmoke;
//     color: whitesmoke;

//   }
//   button {
//     padding: 5px;
//     background-color: #1a1d29;
//     /* border-radius: 10px; */
//     border: 2px solid whitesmoke;
//     color: whitesmoke;
//   }
// `;

// const SpinnerContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, searchMovies } from "../store";
import Modal from "./Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GridResultados from "../components/CarouselYGrid/GridResultados";
import RiseLoader from "react-spinners/RiseLoader";

const Buscador = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const searchResults = useSelector((state) => state.cinestories.resultados);
    const [type, setType] = useState("movie");
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    const handleClick = (movie) => {
        navigate("/infoPeli", { state: movie });
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleSearch = () => {
        if (searchQuery) {
            setModalOpen(true);
            setLoading(true); // Establecer isLoading a true cuando se inicia la búsqueda
            dispatch(searchMovies({ searchQuery, type }))
                .then((response) => {
                    // La búsqueda se completó, actualiza el estado de loading
                    setLoading(false);
                })
                .catch((error) => {
                    // Manejar el error en caso de que ocurra
                    setLoading(false); // Si se produce un error, asegúrate de establecer loading en false
                    console.error(error);
                });
        }
    };


    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <Contenedor>
            <input
                type="text"
                placeholder="Buscador"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="movie">Películas</option>
                <option value="tv">Series de TV</option>
            </select>
            <button onClick={handleSearch}>Buscar</button>

            <Modal open={modalOpen} onClose={closeModal} loading={loading}>
                <div className="modal-contenido">
                    {loading ? (
                        <SpinnerContainer>
                            <RiseLoader color="lime" />
                        </SpinnerContainer>
                    ) : searchResults.length === 0 ? (
                        <p>No se encontraron resultados</p>
                    ) : (
                        <>
                            <GridResultados searchResults={searchResults} />
                        </>
                    )}
                </div>
            </Modal>
        </Contenedor>
    );
};

export default Buscador;

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  h1 {
    margin-right: 5px;
  }

  input {
    padding: 4px;
    margin-right: 5px;
    background-color: #1a1d29;
    color: whitesmoke;
    border: 2px solid whitesmoke;
    ::placeholder {
      color: rgb(128, 134, 167);
    }
  }

  select {
    padding: 5px;
    margin-right: 5px;
    background-color: #1a1d29;
    border: 2px solid whitesmoke;
    color: whitesmoke;
  }

  button {
    padding: 5px;
    background-color: #1a1d29;
    border: 2px solid whitesmoke;
    color: whitesmoke;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

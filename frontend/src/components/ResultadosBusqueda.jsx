import React from "react";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById('root'));

const customModalStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: "800px",
        maxHeight: "80vh",
        overflow: "auto",
        backgroundColor: "#000",
        color: "#fff",
    },
};

const ResultadosBusqueda = ({ results, isOpen, onClose }) => {


    return (
        <Modal appElement={document.getElementById('root')} isOpen={isOpen} onRequestClose={onClose} style={customModalStyles}>


            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((peli) => (
                            <li key={peli.id}>{peli.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No se encontró ningún resultado</p>
                )}
            </div>
        </Modal>
    );
};

export default ResultadosBusqueda;

import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  color: aqua;
  padding: 20px;
  border-radius: 4px;
  z-index: 99999;
  max-height: 80%;
  overflow-y: auto;
`;

const Modal = ({ open, onClose, children }) => {
    if (!open) {
        return null;
    }

    return ReactDOM.createPortal(
        <ModalOverlay>
            <ModalContent>
                <button onClick={onClose}>Cerrar</button>
                {children}
            </ModalContent>
        </ModalOverlay>,
        document.getElementById("modal-root")
    );
};

export default Modal;

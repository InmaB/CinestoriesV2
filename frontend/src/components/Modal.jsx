import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { AiFillCloseCircle } from 'react-icons/ai'
import RiseLoader from 'react-spinners/RiseLoader';


const ModalOverlay = styled.div`
  position: fixed;
  margin: auto;
  top: 0;
  /* left: 0; */
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
  color: black;
  padding: 20px;
  border-radius: 4px;
  z-index: 99999;
  max-height: 80%;
  overflow-y: auto;
  .close-icon {
  color: lime;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 50px;
  cursor: pointer;
}
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Modal = ({ open, onClose, loading, children }) => {
    if (!open) {
        return null;
    }

    return ReactDOM.createPortal(
        <ModalOverlay>
            <ModalContent>
                <AiFillCloseCircle className="close-icon" onClick={onClose} />

                {loading ? (
                    <SpinnerContainer>
                        <RiseLoader color="lime" />
                    </SpinnerContainer>
                ) : (
                    children
                )}
            </ModalContent>
        </ModalOverlay>,
        document.getElementById("modal-root")
    );
};
export default Modal;

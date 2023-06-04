import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cambiarUserImagen, cambiarUsername, getUserByEmail } from '../store/index';
import avatar1 from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const navegacion = useNavigate();
    const [images, setImages] = useState([
        { src: avatar1, alt: "Homer" },
        { src: avatar2, alt: "Micky" },
        // Agrega los otros objetos de imagen aquí...
    ]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };

    const handleUsernameClick = () => {
        toggleSubMenu();
    };

    const handleImageClick = async (imageId) => {
        try {
            // Implementa la lógica para mostrar un formulario o cuadro de diálogo para cambiar la imagen
            // Cuando el usuario seleccione una nueva imagen, actualiza el array de imágenes

            const newProfileImage = "newImage.jpg"; // Reemplaza "newImage.jpg" con el valor seleccionado por el usuario

            // Realiza la solicitud para cambiar la imagen de perfil del usuario
            await dispatch(cambiarUserImagen({ email: userEmail, newProfileImage }));

            // Actualiza el array de imágenes en el estado
            const newImages = images.map((image) => {
                if (image.id === imageId) {
                    return { ...image, src: newProfileImage };
                }
                return image;
            });

            setImages(newImages);
        } catch (error) {
            console.error('Error al cambiar la imagen:', error);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmitUsername = () => {
        dispatch(cambiarUsername({ email: userEmail, newUserName: username }))
            .then(() => {
                // Actualizar el estado con el nuevo nombre de usuario
                setUsername(username);
                // Ocultar el formulario de edición
                toggleSubMenu();
            })
            .catch((error) => {
                console.error("Error al cambiar el nombre de usuario:", error);
            });
    };

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const email = getAuth().currentUser?.email;
                if (!email) {
                    navegacion("/login");
                    return;
                }

                setUserEmail(email); // Almacenar el email en el estado
                const username = await getUserByEmail(email);
                setUsername(username);
            } catch (error) {
                console.error('Error al obtener el nombre de usuario:', error);
            }
        };

        fetchUsername();
    }, [navegacion]);

    return (
        <UserProfileContainer>
            <ProfileToggle onClick={toggleMenu}>
                <ProfileImage src={avatar1} alt="User Avatar" />
            </ProfileToggle>
            {isOpen && (
                <ProfileMenu>
                    <MenuItem onClick={handleImageClick}>
                        Cambiar la imagen
                    </MenuItem>
                    <MenuItem onClick={handleUsernameClick}>
                        Cambiar el username
                    </MenuItem>
                    {showSubMenu && (
                        <SubMenu>
                            <UsernameInput
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <SaveButton onClick={handleSubmitUsername}>Guardar</SaveButton>
                        </SubMenu>
                    )}
                </ProfileMenu>
            )}
        </UserProfileContainer>
    );
};

const UserProfileContainer = styled.div`
  position: relative;
`;

const ProfileToggle = styled.div`
  cursor: pointer;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #1a1d29;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SubMenu = styled.div`
  padding: 10px;
`;

const UsernameInput = styled.input`
  margin-bottom: 10px;
`;

const SaveButton = styled.button`
  padding: 5px 10px;
`;

export default UserProfile;

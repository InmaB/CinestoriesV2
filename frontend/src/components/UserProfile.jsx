import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cambiarUserImagen, cambiarUsername, getUserByEmail } from '../store/index';
import styled from 'styled-components';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';
import avatar4 from '../assets/avatar4.jpg';
import avatar5 from '../assets/avatar5.jpg';
import avatar6 from '../assets/avatar6.jpg';

const UserProfile = () => {

    // Se utiliza useState para declarar múltiples variables de estado
    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [username, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Se declara funciones propias de react
    const navegacion = useNavigate();
    const dispatch = useDispatch();

    //Verifica si hay un correo electrónico de usuario actualmente autenticado
    useEffect(() => {
        const userEmail = getAuth().currentUser?.email;
        if (!userEmail) {
            navegacion("/login");
            return;
        }

        // Obtiene el nombre de usuario a través del correo electrónico
        const fetchUsername = async () => {
            try {
                const username = await getUserByEmail(userEmail);
                setUsername(username);
            } catch (error) {
                console.error('Error al obtener el nombre de usuario:', error);
            }
        };

        fetchUsername();
    }, [navegacion]);

    // Obtener el nombre de usuario y email del usuario actual
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const email = getAuth().currentUser?.email;
                if (!email) {
                    navegacion("/login");
                    return;
                }

                setUserEmail(email); // Almacena el email en el estado
                const username = await getUserByEmail(email);
                setUsername(username);
                console.log("cambiado el username")
            } catch (error) {
                console.error('Error al obtener el nombre de usuario:', error);
            }
        };

        fetchUsername();
    }, [navegacion]);

    useEffect(() => {
        // Recuperar el valor de selectedImage desde el almacenamiento local
        const storedImage = localStorage.getItem('selectedImage');
        if (storedImage) {
            setSelectedImage(storedImage);
        }
    }, []);

    const handleUsernameClick = () => {
        setShowUsernameForm(true);
    };

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleSubmitUsername = () => {
        dispatch(cambiarUsername({ email: userEmail, newUserName: newUsername }))
            .then(() => {
                setUsername(newUsername); // Actualizar el estado con el nuevo nombre de usuario
                setShowUsernameForm(false); // Ocultar el formulario de edición
            })
            .catch((error) => {
                console.error("Error al cambiar el nombre de usuario:", error);
            });
    };

    const handleImageClick = () => {
        setShowSubMenu(!showSubMenu);
    };

    const handleAvatarChange = (avatar) => {
        setSelectedAvatar(avatar);
        const newProfileImage = avatar.src;
        setSelectedImage(newProfileImage);

        // Guardar el valor de selectedImage en el almacenamiento local
        localStorage.setItem('selectedImage', newProfileImage);

        dispatch(
            cambiarUserImagen({ email: userEmail, newProfileImage })
        )
            .then(() => {
                console.log("La imagen de perfil se ha actualizado correctamente");
            })
            .catch((error) => {
                console.error("Error al cambiar la imagen de perfil:", error);
            });
    };

    const handleSignOut = () => {
        signOut(getAuth())
            .then(() => {
                // Redirigir a la página de inicio de sesión
                navegacion('/login');
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
    };

    const avatars = [
        { src: avatar1, alt: "Avatar 1" },
        { src: avatar2, alt: "Avatar 2" },
        { src: avatar3, alt: "Avatar 3" },
        { src: avatar4, alt: "Avatar 4" },
        { src: avatar5, alt: "Avatar 5" },
        { src: avatar6, alt: "Avatar 6" },
    ];

    return (
        <UserProfileContainer>
            <ProfileToggle onClick={() => setIsOpen(!isOpen)}>
                <p>Hola {username}</p>
                <ProfileImage src={selectedImage} alt="User Avatar" />
            </ProfileToggle>
            {isOpen && (
                <ProfileMenu>
                    <MenuItem onClick={handleImageClick}>
                        Cambiar el avatar
                    </MenuItem>
                    <MenuItem onClick={handleUsernameClick}>
                        Cambiar el username
                    </MenuItem>
                    {showSubMenu && (
                        <SubMenu>
                            {avatars.map((avatar, index) => (
                                <AvatarOption
                                    key={index}
                                    src={avatar.src}
                                    alt={avatar.alt}
                                    onClick={() => handleAvatarChange(avatar)}
                                />
                            ))}
                        </SubMenu>
                    )}

                    <MenuItem onClick={handleSignOut}>
                        Salir
                    </MenuItem>
                    {showUsernameForm && (
                        <SubMenu>
                            <UsernameInput
                                type="text"
                                value={newUsername}
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



const AvatarOption = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;
const UserProfileContainer = styled.div`
  position: relative;
  z-index: 9999;
`;

const ProfileToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-left: 10px;
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
    color: #1a1d29;
    background-color: lime;
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

const ImageOption = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    border: 2px solid #1a1d29;
  }
`;

export default UserProfile;


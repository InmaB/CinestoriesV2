// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { cambiarUserImagen, cambiarUsername, getUserByEmail } from '../store/index';
// import avatar1 from '../assets/avatar1.jpg'
// import avatar2 from '../assets/avatar2.jpg'
// import avatar3 from '../assets/avatar3.jpg'
// import styled from 'styled-components';
// import { getAuth } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

// const UserProfile = () => {

//     const dispatch = useDispatch();
//     const [isOpen, setIsOpen] = useState(false);
//     const [showSubMenu, setShowSubMenu] = useState(false);
//     const [username, setUsername] = useState("");
//     const [userId, setUserId] = useState("");
//     const [userEmail, setUserEmail] = useState("");
//     const navegacion = useNavigate();
//     const [images, setImages] = useState([
//         { src: avatar1, alt: "Homer" },
//         { src: avatar2, alt: "Micky" },
//         // Agrega los otros objetos de imagen aquí...
//     ]);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const toggleSubMenu = () => {
//         setShowSubMenu(!showSubMenu);
//     };

//     const handleUsernameClick = () => {
//         toggleSubMenu();
//     };

//     const handleImageClick = async (imageId) => {
//         try {
//             // Implementa la lógica para mostrar un formulario o cuadro de diálogo para cambiar la imagen
//             // Cuando el usuario seleccione una nueva imagen, actualiza el array de imágenes

//             const newProfileImage = "newImage.jpg"; // Reemplaza "newImage.jpg" con el valor seleccionado por el usuario

//             // Realiza la solicitud para cambiar la imagen de perfil del usuario
//             await dispatch(cambiarUserImagen({ email: userEmail, newProfileImage }));

//             // Actualiza el array de imágenes en el estado
//             const newImages = images.map((image) => {
//                 if (image.id === imageId) {
//                     return { ...image, src: newProfileImage };
//                 }
//                 return image;
//             });

//             setImages(newImages);
//         } catch (error) {
//             console.error('Error al cambiar la imagen:', error);
//         }
//     };

//     const handleUsernameChange = (e) => {
//         setUsername(e.target.value);
//     };

//     const handleSubmitUsername = () => {
//         dispatch(cambiarUsername({ email: userEmail, newUserName: username }))
//             .then(() => {
//                 // Actualizar el estado con el nuevo nombre de usuario
//                 setUsername(username);
//                 // Ocultar el formulario de edición
//                 toggleSubMenu();
//             })
//             .catch((error) => {
//                 console.error("Error al cambiar el nombre de usuario:", error);
//             });
//     };

//     useEffect(() => {
//         const fetchUsername = async () => {
//             try {
//                 const email = getAuth().currentUser?.email;
//                 if (!email) {
//                     navegacion("/login");
//                     return;
//                 }

//                 setUserEmail(email); // Almacenar el email en el estado
//                 const username = await getUserByEmail(email);
//                 setUsername(username);
//             } catch (error) {
//                 console.error('Error al obtener el nombre de usuario:', error);
//             }
//         };

//         fetchUsername();
//     }, [navegacion]);

//     return (
//         <UserProfileContainer>
//             <ProfileToggle onClick={toggleMenu}>
//                 <ProfileImage src={avatar1} alt="User Avatar" />
//             </ProfileToggle>
//             {isOpen && (
//                 <ProfileMenu>
//                     <MenuItem onClick={handleImageClick}>
//                         Cambiar la imagen
//                     </MenuItem>
//                     <MenuItem onClick={handleUsernameClick}>
//                         Cambiar el username
//                     </MenuItem>
//                     <MenuItem onClick={handleUsernameClick}>
//                         Salir
//                     </MenuItem>
//                     {showSubMenu && (
//                         <SubMenu>
//                             <UsernameInput
//                                 type="text"
//                                 value={username}
//                                 onChange={handleUsernameChange}
//                             />
//                             <SaveButton onClick={handleSubmitUsername}>Guardar</SaveButton>
//                         </SubMenu>
//                     )}
//                 </ProfileMenu>
//             )}
//         </UserProfileContainer>
//     );
// };

// {/* <button
// className="btn-salir" title='Salir'
// onClick={() => {
//   alert("saliendo");
//   signOut(firebaseAuth);
// }}
// >
// <BiExit /> */}
// const UserProfileContainer = styled.div`
//   position: relative;
// `;

// const ProfileToggle = styled.div`
//   cursor: pointer;
// `;

// const ProfileImage = styled.img`
//   height: 40px;
//   width: 40px;
//   border-radius: 50%;
// `;

// const ProfileMenu = styled.div`
//   position: absolute;
//   top: 100%;
//   right: 0;
//   background-color: #1a1d29;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   z-index: 1;
// `;

// const MenuItem = styled.div`
//   padding: 10px 20px;
//   cursor: pointer;

//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

// const SubMenu = styled.div`
//   padding: 10px;
// `;

// const UsernameInput = styled.input`
//   margin-bottom: 10px;
// `;

// const SaveButton = styled.button`
//   padding: 5px 10px;
// `;

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cambiarUserImagen, cambiarUsername, getUserByEmail } from '../store/index';
import styled from 'styled-components';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';

const UserProfile = () => {
    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [username, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const navegacion = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const userEmail = getAuth().currentUser?.email;
        if (!userEmail) {
            navegacion("/login");
            return;
        }

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


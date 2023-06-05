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
import avatar1 from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'

const UserProfile = () => {
    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [newUsername, setNewUsername] = useState("");

    const navegacion = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [username, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("");



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

    //IMAGEN
    const [images, setImages] = useState([
        { src: avatar1, alt: "Homer" },
        { src: avatar2, alt: "Micky" },
        { src: avatar3, alt: "Spiderman" },
        // Agrega los otros objetos de imagen aquí...
    ]);

    const [selectedImage, setSelectedImage] = useState(avatar1);

    const handleImageClick = () => {
        setShowSubMenu(!showSubMenu);
    };

    const handleImageChange = (newProfileImage) => {
        dispatch(cambiarUserImagen({ email: userEmail, newProfileImage }))
            .then(() => {
                setSelectedImage(newProfileImage);
                setShowSubMenu(false);
                console.log("cambiado el avatar")
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

    return (
        <UserProfileContainer>
            <ProfileToggle onClick={() => setIsOpen(!isOpen)}>
                {/* <ProfileImage src={avatar1} alt="User Avatar" /> */}
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
                            {images.map((image, index) => (
                                <ImageOption
                                    key={index}
                                    src={image.src}
                                    alt={image.alt}
                                    onClick={() => handleImageChange(image.src)}
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
            <p>Hola {username}</p>

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

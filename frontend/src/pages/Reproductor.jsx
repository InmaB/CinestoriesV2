import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { KEY_API } from '../utils/tmbd-config';

export default function Reproductor() {
    const navegacion = useNavigate();
    const [videoUrl, setVideoUrl] = useState('');

    const { idPelicula } = useParams();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${idPelicula}/videos?api_key=${KEY_API}`
                );
                const videos = response.data.results;
                if (videos.length > 0) {
                    const videoKey = videos[0].key;
                    const videoUrl = `https://www.youtube.com/watch?v=${videoKey}`;
                    setVideoUrl(videoUrl);
                }
            } catch (error) {
                console.error('Error al obtener los videos:', error);
            }
        };

        fetchVideos();
    }, [idPelicula]);

    const handleGoBack = () => {
        navegacion(-1);
    };

    return (
        <Contenedor>
            <div className="reproductor">
                <div className="retroceder">
                    <BsArrowLeft onClick={handleGoBack} />
                </div>
                <video src={videoUrl} autoPlay loop controls muted></video>
            </div>
        </Contenedor>
    );
}

const Contenedor = styled.div`
  .reproductor {
    width: 100vw;
    height: 100vh;
    .retroceder {
      position: absolute;
      padding: 2rem;
      z-index: 1;
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

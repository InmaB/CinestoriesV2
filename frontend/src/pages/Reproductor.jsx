import React from 'react'
import styled from 'styled-components'
import { BsArrowLeft } from 'react-icons/bs'
import video from '../assets/video.mp4'
import { useNavigate } from 'react-router-dom'

export default function Reproductor() {
    const navegacion = useNavigate();
    return (
        <Contenedor>
            <div className="reproductor">
                <div className="retroceder">
                    <BsArrowLeft onClick={() => navegacion(-1)}></BsArrowLeft>
                </div>
                <video src={video} autoPlay loop controls muted></video>
            </div>
        </Contenedor>
    )
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
`

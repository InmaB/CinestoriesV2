import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import video from '../assets/video.mp4'
import { IoPlayCircleOutline } from "react-icons/io5"
import { RiThumbDownFill, RiThumbDownLine, RiThumbUpFill } from "react-icons/ri"
import { BsCheck } from "react-icons/bs"
import { AiOutlinePlus } from "react-icons/ai"
import { BiChevronDown } from "react-icons/bi"


export default function PosterListas({ movieData, fav = false }) {
  const [isHover, sertHover] = useState(false)
  const navegacion = useNavigate()
  const [email, setEmail] = useState(undefined)

  // onAuthStateChanged(firebaseAuth, (Usuario) => {

  //   if (Usuario) setEmail(Usuario.email)
  //   else navegacion("/login")
  // });




  return (
    <Contenedor
      onMouseEnter={() => sertHover(true)}
      onmouseleave={() => sertHover(false)}
    >
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="poster" />
      {isHover && (
        <div className="hover">
          <div className='image-video-container'>
            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="poster" onClick={() => navegacion("/reproductor")} />
            <video src={video} autoPlay loop muted onClick={() => navegacion("/reproductor")} ></video>
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navegacion("/reproductor")}> {movieData.name}</h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleOutline title='play' onClick={() => navegacion("/reproductor")}></IoPlayCircleOutline>
              </div>
              <RiThumbUpFill title='Like'></RiThumbUpFill>
              <RiThumbDownFill title='Dislike'></RiThumbDownFill>
              {
                fav ? (
                  <BsCheck title='Remove from list'></BsCheck>
                ) : (
                  <AiOutlinePlus title='Add to my list'></AiOutlinePlus>
                )}
            </div>
            <div className="info">
              <BiChevronDown title='More info'></BiChevronDown>
            </div>
          </div>
          <div className="genres flex">
            <ul className="flex">
              {movieData.genres.map((genre) => {
                return (
                  <li key={genre}>{genre}</li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </Contenedor>
  );
}

const Contenedor = styled.div`
max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 10rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        display: none;
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }`



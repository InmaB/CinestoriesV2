import React, { useState } from 'react'
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Pagination, Navigation } from "swiper";
import PosterPanel from '../PosterPanel';
import PosterTopRated from './PosterTopRated';


export default function CarouselGeneral({ movies, moviesByRated, tvByRated, upcoming }) {

    SwiperCore.use([Pagination, Navigation]);

    const [swiperRef, setSwiperRef] = useState(null);

    return (
        <Contenedor>
            <h1 className='titulo'>Lo más trending</h1>
            <Swiper
                slidesPerView={6}
                centeredSlides={false}
                spaceBetween={15}
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                className="mySwiper"
            >
                {movies.slice(0, 20).map((movie, index) => (
                    <SwiperSlide key={movie.id}>
                        <PosterPanel movieData={movie} index={index} />
                    </SwiperSlide>
                ))}

            </Swiper>

            <h1 className='titulo'>Próximos estrenos de películas</h1>
            <Swiper
                slidesPerView={5}
                centeredSlides={false}
                spaceBetween={15}
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                className="mySwiper"
            >
                {upcoming.slice(0, 20).map((movie, index) => (
                    <SwiperSlide key={movie.id}>
                        <PosterPanel movieData={movie} index={index} />
                    </SwiperSlide>
                ))}


            </Swiper>
            <h1 className='titulo'>Las 10 películas mejores valoradas</h1>
            <Swiper
                slidesPerView={5}
                centeredSlides={false}
                spaceBetween={15}
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                className="mySwiper"
            >
                {moviesByRated.slice(0, 10).map((movie, index) => (
                    <SwiperSlide key={movie.id}>
                        <PosterTopRated movieData={movie} index={index} />
                    </SwiperSlide>
                ))}


            </Swiper>
            <h1 className='titulo'>Las 10 series mejores valoradas</h1>
            <Swiper
                slidesPerView={5}
                centeredSlides={false}
                spaceBetween={15}
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                className="mySwiper"
            >
                {tvByRated.slice(0, 10).map((movie, index) => (
                    <SwiperSlide key={movie.id}>
                        <PosterTopRated movieData={movie} index={index} />
                    </SwiperSlide>
                ))}

            </Swiper>
        </Contenedor>
    );
}


const Contenedor = styled.div`

.swiper-pagination-progressbar {
  height: 3px;
  position: relative;
  bottom: 10px;
  margin-top: 0px;
}
.swiper-pagination-progressbar-fill {
  background-color: white;
}

.swiper {
    margin-bottom:2rem;
    --swiper-navigation-color: '#fff';
}

`;

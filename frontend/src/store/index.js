// import {configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
// import { KEY_API, URL_TMBD } from "../utils/tmbd-config";
// import axios from "axios"


// const initialState= {
//     movies: [],
//     genresLoaded:false,
//     genres:[]
// };


// // acción asíncrona que obtiene los géneros de películas disponibles mediante una llamada a la API de The Movie Database
// export const getGenres=createAsyncThunk("cinestories/genres", async()=>{
//     const {data} = await axios.get(`${URL_TMBD}genre/movie/list?api_key=${KEY_API}`);
//     console.log(data);
//     return data
// })

// // función auxiliar que se usa para procesar los datos de películas de la respuesta de la API y convertirlos en un formato más manejable. La función toma tres argumentos: la matriz de películas, una matriz vacía que se llenará con datos de películas procesados y la matriz de géneros. La función itera a través de cada película en la matriz de películas, extrae los géneros de cada película y los convierte en una matriz de nombres de géneros. Luego, si hay una imagen de fondo disponible para la película, se agrega a la matriz de películas procesados.
// const createArrayFromRawData = (array, moviesArray, genres) => {
//   console.log(array)
//   array.forEach((movie) => {
//     const movieGenres = [];
//     movie.genre_ids.forEach((genre) => {
//       const name = Array.isArray(genres) ? genres.find(({ id }) => id === genre) : null;
//       if (name) movieGenres.push(name.name);
//     });
//     if (movie.backdrop_path)
//       moviesArray.push({
//         id: movie.id,
//         name: movie?.original_name ? movie.original_name : movie.original_title,
//         image: movie.backdrop_path,
//         genres: movieGenres.slice(0, 3),
//       });
//   });
// };



// // Función auxiliar que se usa para llamar a la API de The Movie Database y recuperar datos de películas. La función toma tres argumentos: la URL de la API, la matriz de géneros y un booleano que indica si se debe paginar la llamada a la API. La función itera a través de las páginas de resultados de la API hasta que se han recuperado suficientes películas o se han agotado las páginas de resultados. Cada página de resultados se pasa a la función dataArray para procesar los datos.
// // const getRawData = async (api, genres, paging = false) => {
// //   const moviesArray = [];
// //   for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
// //     const {
// //       data: { results },
// //     } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
// //     createArrayFromRawData(results, moviesArray, genres);
// //   }
// //   return moviesArray;
// // };



// // Esta acción toma un argumento type que indica el tipo de películas que se deben recuperar. La acción usa la función getData para obtener los datos de películas de la API de The Movie Database y los almacena en el campo pelis del estado.
// export const fetchMovies= createAsyncThunk("cinestories/trending", async({type}, thunkApi)=> {
//   const {cinestories:{genres}} = thunkApi.getState();
//   return getRawData (`${URL_TMBD}trending/${type}/week?api_key=${KEY_API}`, genres, true)

// }
// )

// // se define un slice de Redux Toolkit llamado cineStoriesSlice que tiene dos reducers que responden a las acciones getGeneros.fulfilled y fetchPelis.fulfilled. El reducer getGeneros.fulfilled actualiza el estado con los géneros de películas disponibles y el reducer fetchPelis.fulfilled actualiza el estado con los datos de películas recuperados.
// const cineStoriesSlice = createSlice({
//     name: "cinestories",
//     initialState,
//     extraReducers: (builder) => {
//       builder.addCase(getGenres.fulfilled, (state, action) => {
//         state.genres = action.payload;
//         state.genresLoaded= true;
//       });
//       builder.addCase(fetchMovies.fulfilled, (state, action) => {
//         state.movies= action.payload;
//         state.movies = true;
//       });
//     },
//   });

//   export const store = configureStore({
//     reducer: {
//       cinestories: cineStoriesSlice.reducer,
//     },
//   });


//   /////////////////////////////////////////LO NUEVO
// import {configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
// import { KEY_API, URL_TMBD } from "../utils/tmbd-config";
// import axios from "axios"

// const initialState = {
//   movies: [],
//   genresLoaded: false,
//   genres: []
// };

// export const getGenres = createAsyncThunk("cinestories/genres", async () => {
//   const { data } = await axios.get(`${URL_TMBD}genre/movie/list?api_key=${KEY_API}&language=es`);
//   console.log(data);
//   return data
// });

// const createArrayFromRawData = (array, moviesArray, genres) => {
//   array.forEach((movie) => {
//     const movieGenres = [];
//     movie.genre_ids.forEach((genre) => {
//       const name = Array.isArray(genres) ? genres.find(({ id }) => id === genre) : null;
//       if (name) movieGenres.push(name.name);
//     });
//     if (movie.backdrop_path)
//       moviesArray.push({
//         id: movie.id,
//         // name: movie?.original_name ? movie.original_name : movie.original_title,
//         name:movie.title,
//         image: movie.backdrop_path,
//         // genres: genreNames,
//         realise_date:movie.release_date,
//         overview:movie.overview,
//       });
//   });
// };



// export const fetchMovies = createAsyncThunk("cinestories/trending", async ({ type }, thunkApi) => {
//   const { cinestories: { genres } } = thunkApi.getState();
//   const moviesArray = [];
//   const { data: { results } } = await axios.get(`${URL_TMBD}trending/${type}/week?api_key=${KEY_API}&language=es`);
//   createArrayFromRawData(results, moviesArray, genres);
//   return moviesArray;
// });




// export const fetchByGenre = createAsyncThunk("cinestories/genre", async ({ genre,type }, thunkApi) => {
//   const { cinestories: { genres } } = thunkApi.getState();
//   const moviesArray = [];
//   const { data: { results } } = await axios.get(`${URL_TMBD}genre/movie/list?api_key=${KEY_API}&language=es`);
//   console.log(data);
//   return moviesArray;
// });

// export const getUserFavoritas= createAsyncThunk("cinestories/favs", async (email) => {
//   const {data:{movies}} = await axios.get(`http://localhost:5000/api/user/favoritas/${email}`)
//   return movies
// })

// export const eliminarFavorita= createAsyncThunk("cinestories/delete", async (email, movieId) => {
//   const {data:{movies}} = await axios.put(`http://localhost:5000/api/user/delete`, email, movieId)
//   return movies
// })


// const cineStoriesSlice = createSlice({
//   name: "cinestories",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getGenres.fulfilled, (state, action) => {
//       state.genres = action.payload;
//       state.genresLoaded = true;
//     });
//     builder.addCase(fetchMovies.fulfilled, (state, action) => {
//       state.movies = action.payload;
//       state.moviesLoaded = true;
//     });
//     builder.addCase(fetchByGenre.fulfilled, (state, action) => {
//       state.movies = action.payload;
//     });
//     builder.addCase(getUserFavoritas.fulfilled, (state, action) => {
//       state.movies = action.payload;
//     });
//     builder.addCase(eliminarFavorita.fulfilled, (state, action) => {
//       state.movies = action.payload;
//       // state.moviesLoaded = true;
//     });
//   },
// });

// export const store = configureStore({
//   reducer: {
//     cinestories: cineStoriesSlice.reducer,
//   },
// });

// ///////////////////////////////////////PRUEBA
// import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";
// import { KEY_API, LENG_TMBD, URL_TMBD } from "../utils/tmbd-config";
// import axios from "axios";

// const initialState = {
//   movies: [],
//   genresLoaded: false,
//   genres: [],
// };

// export const getGenres = createAsyncThunk("cinestories/genres", async () => {
//   const { data } = await axios.get(`${URL_TMBD}genre/movie/list?api_key=${KEY_API}&language=es`);
//   console.log(data);
//   return data.genres;
// });


// const createArrayFromRawData = (array, genres) => {
//   return array.map((movie) => {
//     const movieGenres = movie.genre_ids.map((genre) => {
//       const name = genres.find(({ id }) => id === genre);
//       return name ? name.name : null;
//     });
//     return {
//       id: movie.id,
//       name: movie.title,
//       poster_path: movie.poster_path,
//       genres: movieGenres,
//       backdrop_path: movie. backdrop_path,
//       vote_average:movie.vote_average,
//       release_date: movie.release_date,
//       overview: movie.overview,
//       poster_path:movie.poster_path,
//     };
//   });
// };

// export const fetchMovies = createAsyncThunk("cinestories/trending", async ({type}, thunkApi) => {
//   const { cinestories: { genres } } = thunkApi.getState();
//   const totalPag = 2;
//   const moviesArray = [];

//   for (let i = 1; i <= totalPag; i++) {
//     const response = await axios.get(`${URL_TMBD}trending/${type}/day?api_key=${KEY_API}&${LENG_TMBD}&page=${i}`);
//     const results = response.data.results;
//     const movies = createArrayFromRawData(results, genres);
//     moviesArray.push(...movies);
//   }

//   return moviesArray;
// });


// // export const fetchByGenre = createAsyncThunk("cinestories/genre", async ({ genre, type }, thunkApi) => {
// //   const { cinestories: { genres } } = thunkApi.getState();
// //   const { data: { results } } = await axios.get(`${URL_TMBD}discover/movie?api_key=${KEY_API}&language=es&with_genres=${genre}`);
// //   const moviesArray = createArrayFromRawData(results, genres);
// //   return moviesArray;
// // });

// // export const fetchByGenre = createAsyncThunk(
// //   "cinestories/genre",
// //   async ({ genre, type }, thunkApi) => {
// //     const { cinestories: { genres } } = thunkApi.getState();
// //     const { data: { results } } = await axios.get(
// //       `${URL_TMBD}discover/${type}?api_key=${KEY_API}&language=es&with_genres=${genre}`
// //     );
// //     const moviesArray = createArrayFromRawData(results, genres);
// //     return moviesArray;
// //   }
// // );
// export const fetchMoviesByGenre = createAsyncThunk("cinestories/fetchMoviesByGenre", async ({type, genres_id}) => {
//   const { cinestories: { genres } } = thunkApi.getState();
//   const { data: { results } } = await axios.get(
//     `${URL_TMBD}discover/${type}?api_key=${KEY_API}&${LENG_TMBD}&with_genres=${genres_id}`
//   );
//   const moviesArray = createArrayFromRawData(results, genres);
//   return moviesArray;

// });


// export const getUserFavoritas = createAsyncThunk("cinestories/favs", async (email) => {
//   const { data: { movies } } = await axios.get(`http://localhost:5000/api/user/favoritas/${email}`);
//   return movies;
// });

// export const eliminarFavorita = createAsyncThunk("cinestories/delete", async ({ email, movieId }) => {
//   const { data: { movies } } = await axios.put(`http://localhost:5000/api/user/delete`, { email, movieId });
//   return movies;
// });

// const cineStoriesSlice = createSlice({
//   name: "cinestories",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getGenres.fulfilled, (state, action) => {
//       state.genres = action.payload;
//       state.genresLoaded = true;
//     });
//     builder.addCase(fetchMovies.fulfilled, (state, action) => {
//       state.movies = action.payload;
//       state.moviesLoaded = true;
//     });
//     builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
//       state.movies= action.payload;
//     });
//     builder.addCase(getUserFavoritas.fulfilled, (state, action) => {
//       state.movies = action.payload;
//     });
//     builder.addCase(eliminarFavorita.fulfilled, (state, action) => {
//       state.movies = action.payload;
//     });
//   },
// });

// export const store = configureStore({
//   reducer: {
//     cinestories: cineStoriesSlice.reducer,
//   },
// });
// ``


//ARREGLO CODI
import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";
import { ADULT_API, KEY_API, LENG_TMBD, URL_TMBD } from "../utils/tmbd-config";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  moviesByRated: [],
  tvByRated: [],
  upcoming:[],
};

const createArrayFromRawData = (array, genres) => {
  return array.map((movie) => {
    const movieGenres = movie.genre_ids.map((genre) => {
      const name = genres.find(({ id }) => id === genre);
      return name ? name.name : null;
    });
    return {
      id: movie.id,
      name: movie.title,
      poster_path: movie.poster_path,
      genres: movieGenres,
      backdrop_path: movie.backdrop_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
      original_title:movie.original_title,
    };
  });
};

export const getGenres = createAsyncThunk("cinestories/genres", async (_, thunkApi) => {
  const { data } = await axios.get(`${URL_TMBD}genre/movie/list?api_key=${KEY_API}&language=es`);
  return data.genres;
});

export const fetchMovies = createAsyncThunk("cinestories/trending", async ({ type }, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  const totalPag = 5;
  const moviesArray = [];

  for (let i = 1; i <= totalPag; i++) {
    const response = await axios.get(`${URL_TMBD}trending/${type}/day?api_key=${KEY_API}&${LENG_TMBD}&page=${i}`);
    const results = response.data.results;
    const movies = createArrayFromRawData(results, genres);
    moviesArray.push(...movies);
  }

  return moviesArray;
});

export const fetchMovieByRated = createAsyncThunk("cinestories/fetchMovieByRated", async (_, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&page=1&region=ES&`);
  const results = response.data.results;
  const movies = createArrayFromRawData(results, genres);
  return movies;
});

export const fetchTvByRated = createAsyncThunk("cinestories/fetchTvByRated", async (_, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&page=1&region=ES&`);
  const results = response.data.results;
  const movies = createArrayFromRawData(results, genres);
  return movies;
});

export const fetchUpcoming = createAsyncThunk("cinestories/fetchUpcoming", async (_, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&page=1&region=ES&`);
  const results = response.data.results;
  const movies = createArrayFromRawData(results, genres);
  return movies;
});



// https://api.themoviedb.org/3/movie/top_rated?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&page=1&region=ES



// export const fetchMoviesByGenre = createAsyncThunk("cinestories/fetchMoviesByGenre", async ({ type, genres_id }, thunkApi) => {
//   const { cinestories: { genres } } = thunkApi.getState();
//   const { data: { results } } = await axios.get(
//     `${URL_TMBD}discover/${type}?api_key=${KEY_API}&${LENG_TMBD}&region=ES&with_genres=${genres_id}`
//   );
//   const moviesArray = createArrayFromRawData(results, genres);
//   return moviesArray;
// });

export const fetchMoviesByGenre = createAsyncThunk("cinestories/fetchMoviesByGenre", async ({ type, genres_id  }, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  const totalPag = 5;
  const moviesArray = [];

  for (let i = 1; i <= totalPag; i++) {
    // https://api.themoviedb.org/3/discover/movie?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&region=ES&with_genres=18&page=2
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&region=ES&with_genres=${genres_id}&page=${i}`);
    const results = response.data.results;
    const movies = createArrayFromRawData(results, genres);
    moviesArray.push(...movies);
  }

  return moviesArray;
});

// export const searchMovies = createAsyncThunk("cinestories/search", async (searchQuery, thunkApi) => {
//   const { cinestories: { genres } } = thunkApi.getState();

//   // Realiza la búsqueda de películas utilizando el parámetro de búsqueda
//   const { data: { results } } = await axios.get(
//     `${URL_TMBD}search/movie?api_key=${KEY_API}&${LENG_TMBD}&query=${searchQuery}`
//   );

//   const moviesArray = createArrayFromRawData(results, genres);
//   return moviesArray;
// });

export const searchMovies = createAsyncThunk("cinestories/search", async ({ searchQuery, type }, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  const searchType = type === "tv" ? "tv" : "movie"; // Determinar el tipo de búsqueda

  // Realiza la búsqueda de películas o series de TV utilizando el parámetro de búsqueda y el tipo
  const { data: { results } } = await axios.get(
    `${URL_TMBD}search/${searchType}?api_key=${KEY_API}&${LENG_TMBD}&query=${searchQuery}`
  );

  const moviesArray = createArrayFromRawData(results, genres);
  return moviesArray;
});


/////////// USUARIO
export const getUserFavoritas = createAsyncThunk("cinestories/favs", async (email) => {
  const { data: { movies } } = await axios.get(`http://localhost:5000/api/user/favoritas/${email}`);
  return movies;
});

export const eliminarFavorita = createAsyncThunk("cinestories/delete", async ({ email, movieId }) => {
  const { data: { movies } } = await axios.put(`http://localhost:5000/api/user/delete`, { email, movieId });
  return movies;
});



const cineStoriesSlice = createSlice({
  name: "cinestories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.moviesLoaded = true;
      console.log(action.payload);
    });
    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserFavoritas.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(eliminarFavorita.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchMovieByRated.fulfilled, (state, action) => {
      state.moviesByRated = action.payload;
    });
    builder.addCase(fetchTvByRated.fulfilled, (state, action) => {
      state.tvByRated = action.payload;
    });
    builder.addCase(fetchUpcoming.fulfilled, (state, action) => {
      state.upcoming = action.payload;
    });

  },

});

export const store = configureStore({
  reducer: {
    cinestories: cineStoriesSlice.reducer,
  },
});


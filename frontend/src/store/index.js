import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";
import { ADULT_API, KEY_API, LENG_TMBD, URL_TMBD } from "../utils/tmbd-config";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  moviesLoaded: false,
  genres: [],
  moviesByRated: [],
  tvByRated: [],
  upcoming:[],
  resultados:[],
  resultadosLoaded:false,
};

const createArrayFromRawData = (array, genres) => {
  return array.map((movie) => {
    const movieGenres = movie.genre_ids.map((genre) => {
      const name = genres.find(({ id }) => id === genre);
      return name ? name.name : null;
    });

    return {
      id: movie.id,
      title: movie.title,
      name: movie.name,
      poster_path: movie.poster_path,
      genres: movieGenres,
      backdrop_path: movie.backdrop_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
      original_title:movie.original_title,
      original_name:movie.original_name,
    };
  });
};



// export const getGenres = createAsyncThunk("cinestories/genres", async (_, thunkApi) => {
//   const { data } = await axios.get(`${URL_TMBD}genre/movie/list?api_key=${KEY_API}&language=es`);
//   return data.genres;
// });

export const getGenres = createAsyncThunk("cinestories/genres", async ({ type }) => {
  const { data } = await axios.get(`${URL_TMBD}genre/${type}/list?api_key=${KEY_API}&language=es`);
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

export const fetchMoviesByGenre = createAsyncThunk("cinestories/fetchMoviesByGenre", async ({ type, genres_id  }, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();
  const totalPag = 5;
  const moviesArray = [];

  for (let i = 1; i <= totalPag; i++) {
    // https://api.themoviedb.org/3/discover/movie?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&region=ES&with_genres=18&page=2
    const response = await axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=dc2d353b9ddadaebcdfa5c1f93065747&language=es-ES&region=ES&with_genres=${genres_id}&page=${i}`);
    const results = response.data.results;
    const movies = createArrayFromRawData(results, genres);
    moviesArray.push(...movies);
  }

  return moviesArray;
});


export const searchMovies = createAsyncThunk("cinestories/search", async ({ searchQuery, type }, thunkApi) => {
  const { cinestories: { genres } } = thunkApi.getState();

  const totalPages = 10;
  const results = [];

  for (let page = 1; page <= totalPages; page++) {
    const response = await axios.get(
      `${URL_TMBD}search/${type}?api_key=${KEY_API}&${LENG_TMBD}&region=ES&query=${searchQuery}&page=${page}`
    );
    console.log(response);

    const { data: { results: pageResults } } = response;

    results.push(...pageResults);
  }

  return results;
});



/////////// USUARIO
export const getUserFavoritas = createAsyncThunk("cinestories/favs", async (email) => {
  const { data: { movies } } = await axios.get(`http://localhost:5000/api/user/favoritas/${email}`);
  return movies;
});

export const getUserPendientes = createAsyncThunk("cinestories/pendientes", async (email) => {
  const { data: { movies } } = await axios.get(`http://localhost:5000/api/user/pendientes/${email}`);
  return movies;
});

export const removeMovieFromLiked = createAsyncThunk(
  'cinestories/deleteLiked',
  async ({ movieId, email }) => {
    const response = await axios.delete('http://localhost:5000/api/user/eliminarFav', { data: { email, movieId } });
    return response.data.movies;
  }
);

export const removeMovieFromToWatch = createAsyncThunk(
  'cinestories/deleteToWatch',
  async ({ movieId, email }) => {
    // Dentro de removeMovieFromToWatch
const response = await axios.delete('http://localhost:5000/api/user/eliminarPendiente', { data: { email, movieId } });
console.log(response)
    return response.data.movies;

  }
);



export const getUserByEmail = async (email) => {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await axios.get(`http://localhost:5000/api/user/getUserByEmail/${encodedEmail}`);

    if (response.data && response.data.username) {
      return response.data.username;
    } else {
      throw new Error('Respuesta inválida del servidor');
    }
  } catch (error) {
    console.error('Error al obtener el nombre de usuario por correo electrónico:', error);
    throw error;
  }
};



export const cambiarUsername = createAsyncThunk(
  'cinestories/cambiarUsername',
  async ({ email, newUserName }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/changeUserName/${email}`, { newUserName });
      return response.data.user;
    } catch (error) {
      throw new Error('Error al cambiar el nombre de usuario.');
    }
  }
);





/////////// SLICE
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
    // builder.addCase(searchMovies.fulfilled, (state, action) => {
    //   state.movies = action.payload;
    //   console.log(action.payload);
    // });

    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.resultados = action.payload;
      state.resultadosLoaded = true;
    });
    builder.addCase(getUserFavoritas.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserPendientes.fulfilled, (state, action) => {
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
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromToWatch.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    // builder.addCase(verificarFavorita.fulfilled, (state, action) => {
    //   state.movies = action.payload;
    // });

  },

});

export const store = configureStore({
  reducer: {
    cinestories: cineStoriesSlice.reducer,
  },
});


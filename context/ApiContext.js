'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';

const DataContext = createContext(null);

const API_URL = 'https://www.omdbapi.com/';
const API_KEY = '70516783';
const DEFAULT_QUERY = 'avengers';
const STORAGE_KEYS = {
  favourites: 'movie-app-favourites',
  watchlist: 'movie-app-watchlist',
};

const initialState = {
  movies: [],
  query: DEFAULT_QUERY,
  page: 1,
  totalResults: 0,
  favourites: [],
  watchlist: [],
  isLoading: false,
  errorMessage: '',
};

function dedupeMovies(movies) {
  return movies.filter(
    (movie, index, array) =>
      array.findIndex((item) => item.imdbID === movie.imdbID) === index,
  );
}

function parseStoredMovies(key) {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch {
    return [];
  }
}

function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        movies: action.payload.movies,
        totalResults: action.payload.totalResults,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        movies: [],
        totalResults: 0,
        errorMessage: action.payload,
      };
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
        page: 1,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'INITIALIZE_COLLECTIONS':
      return {
        ...state,
        favourites: action.payload.favourites,
        watchlist: action.payload.watchlist,
      };
    case 'ADD_FAVOURITE':
      return {
        ...state,
        favourites: dedupeMovies([...state.favourites, action.payload]),
      };
    case 'REMOVE_FAVOURITE':
      return {
        ...state,
        favourites: state.favourites.filter(
          (movie) => movie.imdbID !== action.payload,
        ),
      };
    case 'ADD_WATCHLIST':
      return {
        ...state,
        watchlist: dedupeMovies([...state.watchlist, action.payload]),
      };
    case 'REMOVE_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.imdbID !== action.payload,
        ),
      };
    default:
      return state;
  }
}

function ApiProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'INITIALIZE_COLLECTIONS',
      payload: {
        favourites: parseStoredMovies(STORAGE_KEYS.favourites),
        watchlist: parseStoredMovies(STORAGE_KEYS.watchlist),
      },
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.favourites,
      JSON.stringify(state.favourites),
    );
  }, [state.favourites]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.watchlist,
      JSON.stringify(state.watchlist),
    );
  }, [state.watchlist]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      dispatch({ type: 'FETCH_START' });

      try {
        const params = new URLSearchParams({
          s: state.query,
          apikey: API_KEY,
          page: String(state.page),
        });

        const response = await fetch(`${API_URL}?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Unable to fetch movies right now.');
        }

        const result = await response.json();

        if (result.Response === 'False') {
          throw new Error(result.Error || 'No movies found.');
        }

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            movies: result.Search ?? [],
            totalResults: Number(result.totalResults || 0),
          },
        });
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        dispatch({
          type: 'FETCH_ERROR',
          payload: error.message || 'Something went wrong.',
        });
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [state.page, state.query]);

  const value = {
    movies: state.movies,
    query: state.query,
    page: state.page,
    totalResults: state.totalResults,
    favourites: state.favourites,
    watchlist: state.watchlist,
    isLoading: state.isLoading,
    errorMessage: state.errorMessage,
    setQuery: (query) => dispatch({ type: 'SET_QUERY', payload: query }),
    setPage: (page) => dispatch({ type: 'SET_PAGE', payload: page }),
    addFavourite: (movie) => dispatch({ type: 'ADD_FAVOURITE', payload: movie }),
    removeFavourite: (imdbID) =>
      dispatch({ type: 'REMOVE_FAVOURITE', payload: imdbID }),
    addWatchlist: (movie) => dispatch({ type: 'ADD_WATCHLIST', payload: movie }),
    removeWatchlist: (imdbID) =>
      dispatch({ type: 'REMOVE_WATCHLIST', payload: imdbID }),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useDataContext must be used within ApiProvider.');
  }

  return context;
}

export default ApiProvider;
export { DataContext, useDataContext };

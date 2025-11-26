let movies = [
  { id: 1, title: "Treasure Planet", year: 2002 },
  { id: 2, title: "The Matrix", year: 1999 },
];

const getMovies = async () => {
  return movies;
};

const getMovieById = async (id) => {
  return movies.find((m) => m.id === parseInt(id));
};

const createMovie = async (movieData) => {
  const newMovie = {
    id: movies.length + 1,
    title: movieData.title,
    year: movieData.year,
  };
  movies.push(newMovie);
  return newMovie;
};

const updateMovie = async (id, movieData) => {
  const index = movies.findIndex((m) => m.id === parseInt(id));
  if (index !== -1) {
    movies[index] = { ...movies[index], ...movieData };
    return movies[index];
  }
  return null;
};

const deleteMovie = async (id) => {
  const index = movies.findIndex((m) => m.id === parseInt(id));
  if (index !== -1) {
    movies.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };

import "./movieList.css";

type Movie = {
  title: string;
  director: string;
};

type CinemaProps = {
  cinemaName: string;
  movies: Movie[];
};

const cinema1: CinemaProps = {
  cinemaName: "UGC DeBrouckère",
  movies: [
    {
      title: "HAIKYU-THE DUMPSTER BATTLE",
      director: "Susumu Mitsunaka",
    },
    {
      title: "GOODBYE JULIA",
      director: "Mohamed Kordofani",
    },
    {
      title: "INCEPTION",
      director: "Christopher Nolan",
    },
    {
      title: "PARASITE",
      director: "Bong Joon-ho",
    },
  ],
};

const cinema2: CinemaProps = {
  cinemaName: "UGC Toison d'Or",
  movies: [
    {
      title: "THE WATCHERS",
      director: "Ishana Night Shyamalan",
    },
    {
      title: "BAD BOYS: RIDE OR DIE",
      director: "Adil El Arbi, Bilall Fallah",
    },
    {
      title: "TENET",
      director: "Christopher Nolan",
    },
    {
      title: "THE IRISHMAN",
      director: "Martin Scorsese",
    },
  ],
};

const MovieList = () => {
  return (
    <table className="movies-list">
      <thead>
        <tr>
          <th>Title</th>
          <th>Director</th>
        </tr>
      </thead>
      <tbody>
        {cinema1.movies.map(
          (
            movie,
            index // map sert à parcourir un tableau, key sert à identifier chaque élément de la liste
          ) => (
            <tr key={index}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
            </tr>
          )
        )}
        {cinema2.movies.map(
          (
            movie,
            index // map sert à parcourir un tableau, key sert à identifier chaque élément de la liste
          ) => (
            <tr key={index}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default MovieList;

// Définition des types abstraits

type Movie = {
  title: string;
  director: string;
};

type PageTitleProps = {
  pageTitle: string;
};

type CinemaProps = {
  cinemaName: string;
  movies: Movie[];
};

// Composent App
const App = () => {

    // définition des variables, les informations sur les films et les cinémas

    const pageTitle: PageTitleProps = { pageTitle: "Informations sur les films dans les cinémas" };

    const cinema1: CinemaProps = {
      cinemaName: "UGC DeBrouckère",
      movies: [
        { title: "HAIKYU-THE DUMPSTER BATTLE", director: "Susumu Mitsunaka" },
        { title: "GOODBYE JULIA", director: "Mohamed Kordofani" }
      ]
    };
  
    const cinema2: CinemaProps = {
      cinemaName: "UGC Toison d'Or",
      movies: [
        { title: "THE WATCHERS", director: "Ishana Night Shyamalan" },
        { title: "BAD BOYS: RIDE OR DIE", director: "Adil El Arbi, Bilall Fallah" }
      ]
    };


  // Affichage des informations sur les films et les cinémas
  
  return (
    <div>
      <h1>{pageTitle.pageTitle}</h1>
      <div>
        <h2>{cinema1.cinemaName}</h2>
        <ul>
          {cinema1.movies.map((movie, index) => ( // boucle pour afficher les films
            <li key={index}> {/* // clé pour chaque élément de la liste */}
              Film {index + 1} : <strong>{movie.title}</strong> - {movie.director} {/* // affichage du titre et du réalisateur */}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>{cinema2.cinemaName}</h2>
        <ul>
          {cinema2.movies.map((movie, index) => (
            <li key={index}>
              Film {index + 1} : <strong>{movie.title}</strong> - {movie.director}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
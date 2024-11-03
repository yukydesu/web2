import Cinema from "./Cinema";
import Movie from "./Movie";
import "./Main.css";

const Main = () => {
    return (
      <main className="main">
        <h1>Movie List</h1>
        <Cinema name="UGC DeBrouckère">

          <Movie
            title="HAIKYU-THE DUMPSTER BATTLE" 
            director="Susumu Mitsunaka"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            >
            <p>Duration: 2h 15min</p>
          </Movie>

          <Movie 
            title="GOODBYE JULIA" 
            director="Mohamed Kordofani"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            >
            <p>Duration: 2h 15min</p>
          </Movie>

          <Movie 
            title="INCEPTION" 
            director="Christopher Nolan"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            >
            <p>Duration: 2h 28min</p>
          </Movie>

          <Movie 
            title="PARASITE" 
            director="Bong Joon-ho"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            >
            <p>Duration: 2h 12min</p>
          </Movie>

        </Cinema>

        <Cinema name="UGC Toison d'Or">

          <Movie 
            title="THE WATCHERS" 
            director="Ishana Night Shyamalan"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            >
            <p>Duration: 1h 45min</p>
          </Movie>

          <Movie 
            title="BAD" 
            director="Adil El Arbi, Bilall Fallah"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            >
            <p>Duration: 2h 4min</p>
          </Movie>

          <Movie 
            title="TENET" 
            director="Christopher Nolan"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <p>Duration: 2h 30min</p>
          </Movie>

          <Movie 
            title="THE IRISHMAN" 
            director="Martin Scorsese"
            image="https://images.unsplash.com/photo-1623375428145-4d276c83ce5e?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <p>Duration: 3h 30min</p>
          </Movie>

        </Cinema>
        
      </main>
    );
  };

export default Main;
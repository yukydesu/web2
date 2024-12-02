import Movie from "./Movie";
import { ReactElement } from "react";
import "./Cinema.css";

interface CinemaProps {
    name: string;
    children: ReactElement<typeof Movie> | ReactElement<typeof Movie>[];
  };


const Cinema = (props: CinemaProps) => {
  return (
    <div>
      <h2 className="cinema-name">{props.name}</h2>

      <table className="cinema-table">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Director</th>
            <th>Image</th>
            <th>Informations</th>
          </tr>
        </thead>

        <tbody>
          {props.children} 
        </tbody>
      </table>

    </div>


  );
}

export default Cinema;
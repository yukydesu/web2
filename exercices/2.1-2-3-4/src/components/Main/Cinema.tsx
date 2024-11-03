import Movie from "./Movie";
import { ReactElement } from "react";


interface CinemaProps {
    name: string;
    children: ReactElement<typeof Movie> | ReactElement<typeof Movie>[];
  };


const Cinema = (props: CinemaProps) => {
  return (
    <div className="cinema">
      <h2>{props.name}</h2>
      {props.children}
    </div>
  );
}

export default Cinema;
import { useState } from "react";
import "./Movie.css"

interface MovieProps {
    title: string;
    director: string;
    image: string;
    desription: string;
    children: React.ReactNode;
    }

const Movie = (props: MovieProps) => {

    const [showDescription, setShowDescription] = useState(false);

    const handleTitleClick = () => {
      setShowDescription(!showDescription);
    };
    return (
        
        <tr className="movie-tr">
            
            {/* Afficher la description lorsque que le user clique sur le tire */}

            <td> 
                <p>{props.title}</p>   
                <button onClick={handleTitleClick}>{"afficher la descrition"}</button>
                {showDescription && <p>{props.desription}</p>}

            </td>

            <td>{props.director}</td>
            <td><img src={props.image} alt={props.title} className="movie-image" width="50"/></td>
            <td>{props.children}</td>
        </tr>

    );
}

export default Movie;
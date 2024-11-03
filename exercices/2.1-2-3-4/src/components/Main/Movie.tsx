import "./Movie.css"

interface MovieProps {
    title: string;
    director: string;
    image: string;
    children: React.ReactNode;
    }

const Movie = (props: MovieProps) => {
    return (
        
        <tr className="movie-tr">
            <td>{props.title}</td>
            <td>{props.director}</td>
            <td><img src={props.image} alt={props.title} className="movie-image" width="50"/></td>
            <td>{props.children}</td>
        </tr>

    );
}

export default Movie;
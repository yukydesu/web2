interface MovieProps {
    title: string;
    director: string;
    image: string;
    children: React.ReactNode;
    }

const Movie = (props: MovieProps) => {
    return (
        <div className="movie">
        <h3>{props.title}</h3>
        <p>{props.director}</p>
        <img src={props.image} alt={props.title} className="movie-image" width="50"/>
        {props.children}
        </div>
    );
}

export default Movie;
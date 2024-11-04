import "./UserCard.css"

interface UserCardProps {

    id: number;
    name: string;
    age: number;
    isOnline: boolean;
}

const UserCard  = (props: UserCardProps) => {
    return (
        <div className="user-card">
            <h1>{props.name}</h1>
            <h2>{props.age} ans</h2>
            <h2 className={props.isOnline ? "online" : "offline"}>
                {props.isOnline ? "En ligne" : "Hors ligne"}
            </h2>
        </div>
    );
}
export default UserCard;
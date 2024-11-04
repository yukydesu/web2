import UserList from "./userList";
import UserCard from "./userCard";


const Main = () => {
    return (
        <div>
            <UserList>
                <UserCard id={1} name="John" age={25} isOnline={true} />
                <UserCard id={2} name="Doe" age={30} isOnline={false} />
                <UserCard id={3} name="Jane" age={22} isOnline={true} />
                <UserCard id={4} name="Smith" age={28} isOnline={false} />
            </UserList>

            <UserList>
                <UserCard id={1} name="John" age={25} isOnline={true} />
                <UserCard id={2} name="Doe" age={30} isOnline={false} />
                <UserCard id={3} name="Jane" age={22} isOnline={true} />
                <UserCard id={4} name="Smith" age={28} isOnline={false} />
            </UserList>

            <UserList>
                <UserCard id={1} name="John" age={25} isOnline={true} />
                <UserCard id={2} name="Doe" age={30} isOnline={false} />
                <UserCard id={3} name="Jane" age={22} isOnline={true} />
                <UserCard id={4} name="Smith" age={28} isOnline={false} />
            </UserList>
        </div>
    );
}

export default Main;
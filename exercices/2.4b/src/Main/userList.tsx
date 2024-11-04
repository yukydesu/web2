import UserCard from "./userCard";
import { ReactElement } from "react";

interface UserListProps {
    children: ReactElement<typeof UserCard> | ReactElement<typeof UserCard>[];
}

const UserList = (props: UserListProps) => {
    return (
        <div className="user-list">
            {props.children}
        </div>
    );
}

export default UserList;
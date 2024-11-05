import { useGetUsersQuery } from "../../store/api/users/users-api";
import { IUser } from "./models";
import UsersTable from "./UserTable";


const Users = () => {
  const { data } = useGetUsersQuery<{data: IUser[]}>();

  return (<UsersTable data={data}/>);
};

export default Users;

import { useGetUsersQuery } from "../../store/api/users/users-api";
import UsersTable from "./UserTable";


const Users = () => {
  const { data } = useGetUsersQuery<any>();

  return (<UsersTable data={data}/>);
};

export default Users;

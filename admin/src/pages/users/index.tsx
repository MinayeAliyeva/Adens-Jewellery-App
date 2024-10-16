import { useGetUsersQuery } from "../../store/api/users/users-api";

import UsersTable from "./UsersTable";

const Users = () => {
  const { data } = useGetUsersQuery<any>();

  return (
    <>
      <UsersTable data={data}/>
    </>
  );
};

export default Users;

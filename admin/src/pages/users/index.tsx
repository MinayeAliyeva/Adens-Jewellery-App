import { useEffect } from "react";
import { useGetUsersQuery } from "../../store/api/users/users-api";

import UsersTable from "./usersTable";

const Users = () => {
  const { data } = useGetUsersQuery<any>();
  console.log("usersData", data);

  return (
    <>
      <UsersTable data={data}/>
    </>
  );
};

export default Users;

import { columns } from "./data";
import UsersTable from "./usersTable";

const Users = () => {
  const data = [
    {
      name: "Minaya",
      lastName: "Aliyeva",
      phone: "3433",
      email: "gmail",
      password: "1234",
    },
  ];
  return (
    <>
      <UsersTable data={data} columns={columns} />
    </>
  );
};

export default Users;

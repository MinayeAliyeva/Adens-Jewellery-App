import { IUser } from "./modules";

export const columns = [
  {
    title: "Image",
    dataIndex: "mainImageUrl",
    key: "mainImageUrl",
    render: (_: string, record: IUser) => {
      return (
        <img
          src={record?.mainImageUrl}
          alt={record.productName}
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      );
    },
  },
  {
    title: "FirstName",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    render: (item: string[]) => {
      return item;
    },
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "UserId",
    dataIndex: "userId",
    key: "userId",
  },
];

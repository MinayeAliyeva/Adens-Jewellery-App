import { Content } from "antd/es/layout/layout";
import { IUser } from "./modules";

export const columns = [
  {
    title: "Image",
    dataIndex: "mainImageUrl",
    key: "mainImageUrl",
    render: (text: any, record: IUser) => {
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
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    render: (item: string[], record: IUser) => {
      console.log("item", item);
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
  {
    title: "",
    key: "actions",
    render: (text: any, record: IUser) => {
      console.log("record", record);

      return (
        <Content style={{ display: "flex", gap: "20px" }}>
          {/* <OpenEditDialogButton product={record} />
            <OpenDeleteDialogButton product={record} /> */}
        </Content>
      );
    },
  },
];

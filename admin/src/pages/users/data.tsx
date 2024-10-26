import { TableColumnsType } from "antd";
interface DataType {
  key: React.Key;
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
export const columns: TableColumnsType<DataType> = [
  { title: "First Name", dataIndex: "firstName", key: "firstName" },
  { title: "Last Name", dataIndex: "lastName", key: "lastName" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  { title: "Email", dataIndex: "email", key: "email" },
];
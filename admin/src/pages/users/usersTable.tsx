import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: number;
  phone: string;
  description: string;
  email:string
}

const columns: TableColumnsType<DataType> = [
  { title: 'firstName', dataIndex: 'firstName', key: 'firstName' },
  { title: 'lastName', dataIndex: 'lastName', key: 'lastName' },
  { title: 'phone', dataIndex: 'phone', key: 'phone' },
  { title: 'email', dataIndex: 'email', key: 'email' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const data: DataType[] = [
  {
    key: 1,
    firstName: 'John Brown',
    lastName: 32,
    phone: 'New York No. 1 Lake Park',
    email: 'ffg@fghj',
    description: 'My firstName is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  // {
  //   key: 2,
  //   firstName: 'Jim Green',
  //   lastName: 42,
  //   phone: 'London No. 1 Lake Park',
  //   description: 'My firstName is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  // },
  // {
  //   key: 3,
  //   firstName: 'Not Expandable',
  //   lastName: 29,
  //   phone: 'Jiangsu No. 1 Lake Park',
  //   description: 'This not expandable',
  // },
  // {
  //   key: 4,
  //   firstName: 'Joe Black',
  //   lastName: 32,
  //   phone: 'Sydney No. 1 Lake Park',
  //   description: 'My firstName is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  // },
];

const UsersTable: React.FC = () => (
  <Table<DataType>
    columns={columns}
    expandable={{
      expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
      rowExpandable: (record) => record.firstName !== 'Not Expandable',
    }}
    dataSource={data}
  />
);

export default UsersTable;
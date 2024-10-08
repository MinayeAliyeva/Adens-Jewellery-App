import { Button, Input, TableColumnsType } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  id?: string | null;
}

export const columns = ({
  filteredInfo,
  setAgeSort,
  sortedInfo,
  editTable,
  isEdit,
  isCreate,
  editCategory,
  selectedId,
}: {
  filteredInfo?: Record<string, FilterValue | null>;
  setAgeSort?: () => void;
  sortedInfo?: SorterResult<DataType>;
  editTable?: (isEdit: boolean) => void;
  isEdit?: boolean;
  isCreate?: boolean;
  editCategory?: (id: string) => void;
  selectedId?: string | null;
}): TableColumnsType<DataType> => [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (name: string, record: DataType) => {
      return (
        <>
          {selectedId === record?.id ? (
            <Input
              value={name}
              onChange={(e) => {
                console.log("", e.target.value);
              }}
            />
          ) : (
            <div>{name}</div>
          )}
        </>
      );
    },
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search address"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            setSelectedKeys([]);
            confirm();
          }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filteredValue: filteredInfo?.name || null,
    onFilter: (value, record) => record.name.includes(value as string),
    sorter: (a, b) => a?.name?.length - b?.name?.length,
    sortOrder: sortedInfo?.columnKey === "name" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    render: (age: number, record: DataType) => {
      return (
        <>
          {selectedId === record?.id ? (
            <Input
              type="number"
              value={age} 
              onChange={(e) => {
                console.log("Updated age:", e.target.value);
              }}
            />
          ) : (
            <div>{age}</div>
          )}
        </>
      );
    },
    sorter: (a, b) => a?.age - b?.age,
    sortOrder: sortedInfo?.columnKey === "age" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (address: string, record: DataType) => {
      return (
        <>
          {selectedId === record?.id ? (
            <Input
              value={address} 
              onChange={(e) => {
                console.log("Updated address:", e.target.value);
              }}
            />
          ) : (
            <div>{address}</div>
          )}
        </>
      );
    },
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search address"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            setSelectedKeys([]);
            confirm();
          }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filteredValue: filteredInfo?.address || null,
    onFilter: (value, record) =>
      record.address.toLowerCase().includes((value as string).toLowerCase()),
    sorter: (a, b) => a?.address?.length - b?.address?.length,
    sortOrder: sortedInfo?.columnKey === "address" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: (_, record: DataType) => {
      console.log("record", record.id === selectedId);

      return (
        <>
          {record.id === selectedId ? (
            <>
              <Button
                type="primary"
                icon={<FaSave />}
                onClick={() => {
                  console.log("Save changes for:", record.id);
                }}
              />

              <Button
                icon={<MdOutlineCancel />}
                onClick={() => {
                  console.log("Cancel editing for:", record.id);
                }}
              />
            </>
          ) : (
            <>
              <Button
                icon={<CiEdit />}
                onClick={() => editCategory?.(record.id!)}
              />
              <Button icon={<MdDelete />} />
            </>
          )}
        </>
      );
    },

    ellipsis: true,
  },
];

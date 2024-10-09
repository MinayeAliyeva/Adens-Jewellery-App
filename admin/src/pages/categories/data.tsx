import { Button, Input, TableColumnsType, Typography } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { ICatagoryResponse } from "../../store/api/catagory/modules";
import InputComponent from "../../components/InputComponent";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { IFormField } from ".";

export const columns = ({
  control,
  filteredInfo,
  setAgeSort,
  sortedInfo,
  editTable,
  isEdit,
  isCreate,
  editCategory,
  selectedId,
  errors,
  onFinish,
  handleSubmit,
  onCancel,
  onDeleteCategoryById
}: {
  handleSubmit: UseFormHandleSubmit<IFormField, undefined>;
  control: Control<IFormField>;
  filteredInfo?: Record<string, FilterValue | null>;
  setAgeSort?: () => void;
  sortedInfo?: SorterResult<ICatagoryResponse>;
  editTable?: (isEdit: boolean) => void;
  isEdit?: boolean;
  isCreate?: boolean;
  editCategory?: (id: string) => void;
  selectedId?: string | null;
  errors: FieldErrors<IFormField>;
  onFinish: (values: IFormField) => void;
  onCancel: () => void;
  onDeleteCategoryById: (id: string) => void;
}): TableColumnsType<ICatagoryResponse> => [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
    render: (name: string, record: ICatagoryResponse) => {
      if (!record?._id && !record?.name) {
        return (
          <InputComponent
            // defaultValue={name}
            name="name"
            control={control as any}
            placeholder="Category Name"
            errorMessage={errors?.name}
          />
        );
      }
      return (
        <>
          {selectedId === record?._id ? (
            <InputComponent
              defaultValue={name}
              name="name"
              control={control as any}
              placeholder="Category Name"
              errorMessage={errors?.name}
            />
          ) : (
            <Typography>{name}</Typography>
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
    title: "brand",
    dataIndex: "brand",
    key: "brand",
    render: (name: string, record: ICatagoryResponse) => {
      if (!record?._id && !record?.name) {
        return (
          <InputComponent
            // defaultValue={name}
            name="name"
            control={control as any}
            placeholder="Category Name"
            errorMessage={errors?.name}
          />
        );
      }
      return (
        <>
          {selectedId === record?._id ? (
            <InputComponent
              defaultValue={name}
              name="name"
              control={control as any}
              placeholder="Category Name"
              errorMessage={errors?.name}
            />
          ) : (
            <Typography>{name}</Typography>
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
  // {
  //   title: "Age",
  //   dataIndex: "age",
  //   key: "age",
  //   render: (age: number, record:  ICatagoryResponse) => {
  //     return (
  //       <>
  //         {selectedId === record?.id ? (
  //            <Form.Item
  //            name="age"
  //            style={{ margin: 0 }}
  //            rules={[
  //              {
  //                required: true,
  //                message: `Please Input age!`,
  //              },
  //            ]}
  //          >
  //            <Input
  //             type="number"
  //             // value={age}
  //             // onChange={(e) => {
  //             //   console.log("Updated age:", e.target.value);
  //             // }}
  //           />
  //          </Form.Item>

  //         ) : (
  //           <div>{age}</div>
  //         )}
  //       </>
  //     );
  //   },
  //   sorter: (a, b) => a?.age - b?.age,
  //   sortOrder: sortedInfo?.columnKey === "age" ? sortedInfo.order : null,
  //   ellipsis: true,
  // },
  // {
  //   title: "Address",
  //   dataIndex: "address",
  //   key: "address",
  //   render: (address: string, record:  ICatagoryResponse) => {
  //     return selectedId === record?.id ? (
  //           <Input
  //             value={address}
  //             onChange={(e) => {
  //               console.log("Updated address:", e.target.value);
  //             }}
  //           />
  //         ) : (
  //           <div>{address}</div>
  //         )
  //   },
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         placeholder="Search address"
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => confirm()}
  //         style={{ width: 188, marginBottom: 8, display: "block" }}
  //       />
  //       <Button
  //         type="primary"
  //         onClick={() => confirm()}
  //         size="small"
  //         style={{ width: 90, marginRight: 8 }}
  //       >
  //         Search
  //       </Button>
  //       <Button
  //         onClick={() => {
  //           setSelectedKeys([]);
  //           confirm();
  //         }}
  //         size="small"
  //         style={{ width: 90 }}
  //       >
  //         Reset
  //       </Button>
  //     </div>
  //   ),
  //   filteredValue: filteredInfo?.address || null,
  //   onFilter: (value, record) =>
  //     record.address.toLowerCase().includes((value as string).toLowerCase()),
  //   sorter: (a, b) => a?.address?.length - b?.address?.length,
  //   sortOrder: sortedInfo?.columnKey === "address" ? sortedInfo.order : null,
  //   ellipsis: true,
  // },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: (_, record: ICatagoryResponse) => {
      // if(!record?._id && !record?.name){}

      return (
        <div>
          {(record._id && record._id !== selectedId) ||
          record?._id === undefined ? (
            <>
              <Button
                htmlType="button"
                icon={<CiEdit />}
                onClick={() => editCategory?.(record._id)}
              />
              <Button
                onClick={() => onDeleteCategoryById(record?._id)}
                icon={<MdDelete />}
                htmlType="button"
              />
            </>
          ) : (
            <>
              <Button
                type="primary"
                htmlType="button"
                icon={<FaSave />}
                onClick={handleSubmit((values) =>
                  onFinish({ ...values, id: record?._id })
                )}
              />
              <Button
                icon={<MdOutlineCancel />}
                htmlType="button"
                onClick={onCancel}
              />
            </>
          )}
        </div>
      );
    },

    ellipsis: true,
  },
];

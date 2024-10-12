import { Button, Input, TableColumnsType, Typography } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { ICatagoryResponse } from "../../store/api/catagory/modules";
import InputComponent from "../../components/InputComponent";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { IFormField } from ".";
import { Content } from "antd/es/layout/layout";

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
  onDeleteCategoryById,
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
    title: "№",
    dataIndex: "_id",
    key: "_id",
    width: 170,

    render: (text, record, index) => index + 1,
  },
  {
    title: "Brand Name",
    dataIndex: "name",
    key: "name",
    // align:"center",
    render: (name: string, record: ICatagoryResponse) => {
      if (!record?._id && !record?.name) {
        return (
          <InputComponent
            // defaultValue={name}
            name="name"
            control={control as any}
            placeholder="Brand Name"
            errorMessage={errors?.name?.message}
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
              placeholder="Brand Name"
              errorMessage={errors?.name?.message}
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
    title: "",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (_, record: ICatagoryResponse) => {
      return (
        <div>
          {(record._id && record._id !== selectedId) ||
          record?._id === undefined ? (
            <Content style={{ display: "flex", gap: "20px" }}>
              <Button
                htmlType="button"
                icon={<CiEdit />}
                onClick={() => editCategory?.(record._id)}
                color="primary"
                variant="dashed"
              />
              <Button
                onClick={() => onDeleteCategoryById(record?._id)}
                icon={<MdDelete />}
                htmlType="button"
                color="danger"
                variant="dashed"
              />
            </Content>
          ) : (
            <Content style={{ display: "flex", gap: "20px" }}>
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
                variant="solid"
                color="danger"
              />
            </Content>
          )}
        </div>
      );
    },

    ellipsis: true,
  },
];

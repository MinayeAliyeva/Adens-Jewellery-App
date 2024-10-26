import { Button, Input, TableColumnsType, Typography } from "antd";
import * as yup from "yup";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { ICatagoryResponse } from "../../store/api/catagory/modules";
import InputComponent from "../../utils/components/InputComponent";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { IFormField } from ".";
import { Content } from "antd/es/layout/layout";
import { TFunction } from "i18next";

export interface IPaginationData {
  current: number;
  pageSize: number;
};

export const defaultPaginationData: IPaginationData = {
  current: 1,
  pageSize: 10,
};

export const schema = yup.object().shape({
  name: yup.string().required("Brand Name is required"),
});

export const columns = ({
  control,
  filteredInfo,
  setAgeSort,
  sortedInfo,
  createBrand,
  updateBrand,
  editTable,
  isEdit,
  isCreate,
  editBrand,
  selectedId,
  onFinish,
  handleSubmit,
  onCancel,
  onDeleteBrandById,
  t
}: {
  handleSubmit: UseFormHandleSubmit<IFormField, undefined>;
  control: Control<IFormField>;
  filteredInfo?: Record<string, FilterValue | null>;
  setAgeSort?: () => void;
  sortedInfo?: SorterResult<ICatagoryResponse>;
  editTable?: (isEdit: boolean) => void;
  isEdit?: boolean;
  isCreate?: boolean;
  createBrand?: boolean;
  updateBrand?: boolean;
  editBrand?: (id: string) => void;
  selectedId?: string | null;
  onFinish: (values: IFormField) => void;
  onCancel: () => void;
  onDeleteBrandById: (id: string) => void;
  t: TFunction<"translation", string>
}): TableColumnsType<ICatagoryResponse> => [
  {
    title: "№",
    dataIndex: "_id",
    key: "_id",
    width: 170,

    render: (text, record, index) => index + 1,
  },
  {
   title: t("Brand Name"),
    dataIndex: "name",
    key: "name",
    render: (name: string, record: ICatagoryResponse) => {
      if (!record?._id && !record?.name && createBrand) {
        return (
          <InputComponent
            name="name"
            control={control as any}
            placeholder="Brand Name"
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
      const isEdit =
      (record?._id !== selectedId && !createBrand && !updateBrand) ||
      (createBrand && record?._id !== selectedId && !updateBrand) ||
      (updateBrand && record?._id !== selectedId);
      return (
        <div>
          {isEdit? (
            <Content style={{ display: "flex", gap: "20px" }}>
              <Button
                htmlType="button"
                icon={<CiEdit />}
                onClick={() => editBrand?.(record._id)}
                color="primary"
                variant="dashed"
              />
              <Button
                onClick={() => onDeleteBrandById(record?._id)}
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
                onClick={handleSubmit((values) =>{
                  onFinish({ ...values, id: record?._id })
                }
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

import { Button, Input, TableColumnsType, Typography } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import * as yup from "yup";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { ICatagoryResponse } from "../../store/api/catagory/modules";
import InputComponent from "../../utils/components/InputComponent";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { IFormField } from ".";
import { IBrandsResponse } from "../../store/api/brand/modules";
import SelectBoxComponent from "../../utils/components/SelectBoxComponent";
import { Content } from "antd/es/layout/layout";

export interface IPaginationData {
  current: number;
  pageSize: number;
}

export const defaultPaginationData: IPaginationData = {
  current: 1,
  pageSize: 10,
};

export const paginationSizeOptions: string[] = ["10, 20, 30"];

export const schema = yup.object().shape({
  name: yup.string().required("First Name is required"),
});

const brandOptions = (brands?: IBrandsResponse[]) =>
  brands?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

export const columns = ({
  control,
  filteredInfo,
  setAgeSort,
  sortedInfo,
  editTable,
  isEdit,
  isCreate,
  brandData,
  editCategory,
  selectedId,
  createCategory,
  updateCategory,
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
  updateCategory: boolean;
  errors: FieldErrors<IFormField>;
  onFinish: (values: IFormField) => void;
  onCancel: () => void;
  onDeleteCategoryById: (id: string) => void;
  brandData?: IBrandsResponse[];
  createCategory: boolean;
}): TableColumnsType<ICatagoryResponse> => [
  {
    title: "№",
    dataIndex: "_id",
    key: "_id",
    width: 220,

    render: (_, __, index) => index + 1,
  },
  {
    title: "Category name",
    dataIndex: "name",
    key: "name",
    width: 320,
    render: (name: string, record: ICatagoryResponse) => {
      return (
        <>
          {record?._id ? (
            <Typography>{name}</Typography>
          ) : (
            <InputComponent
           
              defaultValue={name}
              name="name"
              control={control as any}
              placeholder="Category Name"
              errorMessage={errors?.name?.message}
            />
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
    title: "Brand name",
    dataIndex: "brand",
    key: "brand",
    width: 520,
    render: (brand: any, record: ICatagoryResponse) => {
      if (!record?._id && !record?.name) {
        return (
          <SelectBoxComponent
            control={control as any}
            name="brand"
            allowClear
            options={brandOptions(brandData)}
            style={{ width: "100%" }}
          />
        );
      }
      return (
        <>
          {selectedId === record?._id ? (
            <SelectBoxComponent
              control={control as any}
              name="brand"
              allowClear
              defaultValue={brand?.name}
              options={brandOptions(brandData)}
              style={{ width: "100%" }}
            />
          ) : (
            <Typography>{brand?.name}</Typography>
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
    render: (_, record: ICatagoryResponse) => {
      const isEdit =
        (record?._id !== selectedId && !createCategory && !updateCategory) ||
        (createCategory && record?._id !== selectedId && !updateCategory) ||
        (updateCategory && record?._id !== selectedId);

      return (
        <div>
          {isEdit ? (
            <Content style={{ display: "flex", gap: "20px" }}>
              <Button
                htmlType="button"
                disabled={createCategory || updateCategory}
                color="primary"
                icon={<CiEdit />}
                onClick={() => editCategory?.(record._id)}
                variant="dashed"
              />
              <Button
                onClick={() => onDeleteCategoryById(record?._id)}
                icon={<MdDelete />}
                disabled={createCategory || updateCategory}
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

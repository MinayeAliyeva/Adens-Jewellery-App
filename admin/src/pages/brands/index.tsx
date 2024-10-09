import { FC, useEffect, useState } from "react";
import { Form, Space, Table } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdClearAll } from "react-icons/md";
import type { TableProps } from "antd";
import { columns } from "./data";

import { ICatagoryResponse } from "../../store/api/catagory/modules";
import { ButtonComponent } from "../../components/ButtonComponent";
import {
  useCreateBrandMutation,
  useDeleteBrandByIdMutation,
  useLazyGetBrandsQuery,
  useUpdateBrandByIdMutation,
} from "../../store/api/brand/brand-api";

type OnChange = NonNullable<TableProps<ICatagoryResponse>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

export interface IFormField {
  name: string;
  id?: string;
}
const schema = yup.object().shape({
  name: yup.string().required("First Name is required"),
});

const Brand: FC = () => {
  const [getBrands, { data: brandData, isLoading: isLoadingBrand }] =
    useLazyGetBrandsQuery();

  const [craeteBrand, { isLoading: isLoadingCreatedBrand }] =
    useCreateBrandMutation();

  const [deleteBrandById, { isLoading: isLoadingDeleteBrandById }] =
    useDeleteBrandByIdMutation();

  const [updateBrandById, { isLoading: isLoadingUpdateBrandById }] =
    useUpdateBrandByIdMutation();

  const [tableData, setTableData] = useState<ICatagoryResponse[]>([]);
  const isLoading =
    isLoadingCreatedBrand ||
    isLoadingDeleteBrandById ||
    isLoadingUpdateBrandById;
  useEffect(() => {
    if (!isLoading) {
      console.log("RERENDER EFFECT");

      getBrands().then((res) => setTableData(res?.data!));
    }
  }, [isLoading]);

  const [selectedId, setSelectedId] = useState<string | null>();

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormField>({
    resolver: yupResolver(schema),
  });

  const onFinish = (category: IFormField) => {
    if (selectedId) {
      updateBrandById({ name: category?.name, id: category?.id! });
    } else {
      craeteBrand({ name: category?.name });
    }
    setSelectedId(null);
    reset();
  };

  console.log("RERENDER");

  const editCategory = (id?: string | null) => {
    reset();
    setSelectedId(id!);
  };

  const onCancel = () => {
    reset();
    setSelectedId(null);
    setTableData(brandData!);
  };

  const onCreateCategory = () => {
    if (tableData.find((data) => data?._id === "")) return;
    setTableData((prev) => [{ name: "", _id: "" }, ...prev!]);
  };
  const onDeleteCategoryById = (id: string) => {
    deleteBrandById(id);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        {/* <Button color="primary" variant="outlined">
           jjjj
          </Button> */}
        {/* <Button onClick={clearFilters}>Clear filters</Button> */}
        <ButtonComponent
          variant="outlined"
          icon={<MdClearAll />}
          onClick={clearFilters}
          buttonText="Clear filters"
        />
        {/* <Button onClick={clearAll}>Clear filters and sorters</Button> */}
        <ButtonComponent
          variant="outlined"
          icon={<MdClearAll />}
          onClick={clearAll}
          buttonText="Clear filters and sorters"
        />
        <ButtonComponent
          icon={<IoIosAddCircleOutline />}
          variant="outlined"
          buttonText="Create New Brand"
          onClick={onCreateCategory}
          //border="2px solid red"
        />
      </Space>
      <Form>
        <Table<ICatagoryResponse>
          columns={columns({
            handleSubmit,
            onFinish,
            errors,
            control,
            filteredInfo,
            setAgeSort,
            sortedInfo,
            editCategory,
            selectedId,
            onCancel,
            onDeleteCategoryById,
          })}
          bordered={true}
          loading={isLoadingBrand || isLoading}
          dataSource={tableData}
          onChange={handleChange}
        />
      </Form>
    </>
  );
};

export default Brand;

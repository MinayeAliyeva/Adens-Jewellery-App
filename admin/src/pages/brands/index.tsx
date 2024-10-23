import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Space, Table } from "antd";
import type { TableProps } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdClearAll } from "react-icons/md";
import { ICatagoryResponse } from "../../store/api/catagory/modules";
import { ButtonComponent } from "../../utils/components/ButtonComponent";
import { columns, schema } from "./data";

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

const Brand: FC = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<ICatagoryResponse[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>();
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  
  const [getBrands, { data: brandData, isLoading: isLoadingBrand }] =
    useLazyGetBrandsQuery();

  const [craeteBrand, { isLoading: isLoadingCreatedBrand }] =
    useCreateBrandMutation();

  const [deleteBrandById, { isLoading: isLoadingDeleteBrandById }] =
    useDeleteBrandByIdMutation();

  const [updateBrandById, { isLoading: isLoadingUpdateBrandById }] =
    useUpdateBrandByIdMutation();


  const isLoading =
    isLoadingCreatedBrand ||
    isLoadingDeleteBrandById ||
    isLoadingUpdateBrandById;

  useEffect(() => {
    if (!isLoading) {
      getBrands().then((res) => {
        setTableData(res?.data!);
      });
    }
  }, [isLoading]);



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
    setError,
    clearErrors,
  } = useForm<IFormField>({
    resolver: yupResolver(schema),
  });

  const onFinish = (category: IFormField) => {
    if (selectedId) {
      updateBrandById({ name: category?.name, id: category?.id! });
    } else {
      craeteBrand({ name: category?.name }).then((res:any) => {
        if (res?.error?.data)
        setError("name", { type: "required", message: res?.error?.data });
     
      });
    }
    setSelectedId(null);
    reset();
  };

  const editBrand = (id?: string | null) => {
    reset();
    clearErrors("name");
    setSelectedId(id!);
  };

  const onCancel = () => {
    reset();
    clearErrors("name");
    setSelectedId(null);
    setTableData(brandData!);
  };

  const onCreateBrand = () => {
    if (tableData?.find((data) => data?._id === "")) return;
    setTableData((prev) => [{ name: "", _id: "" }, ...(prev! ?? [])]);
  };
  const onDeleteCategoryById = (id: string) => {
    deleteBrandById(id);
  };

  const memorizedColumns = useMemo(
    () =>
      columns({
        handleSubmit,
        onFinish,
        errors,
        control,
        filteredInfo,
        setAgeSort,
        sortedInfo,
        editBrand,
        selectedId,
        onCancel,
        onDeleteCategoryById,
        t,
      }),
    [
      errors,
      control,
      filteredInfo,
      setAgeSort,
      sortedInfo,
      editBrand,
      selectedId,
      onCancel,
      onDeleteCategoryById,
      t,
    ]
  );

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <ButtonComponent
          variant="outlined"
          icon={<MdClearAll />}
          onClick={clearFilters}
          buttonText="Clear filters"
        />
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
          onClick={onCreateBrand}
        />
      </Space>
      <Form>
        <Table<ICatagoryResponse>
          columns={memorizedColumns}
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

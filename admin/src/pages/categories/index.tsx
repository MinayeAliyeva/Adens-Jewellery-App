import { FC, useEffect, useState } from "react";
import { Button, Form, Space, Table } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdClearAll } from "react-icons/md";
import type { TableProps } from "antd";
import { columns } from "./data";
import {
  useCreateCategoryMutation,
  useDeleteCategoryByIdMutation,
  useLazyGetCategoriesQuery,
  useUpdateCategoryByIdMutation,
} from "../../store/api/catagory/catagory-api";
import { ICatagoryResponse } from "../../store/api/catagory/modules";
import { ButtonComponent } from "../../components/ButtonComponent";

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

const Category: FC = () => {
  const [getCategory, { data: categoryData, isLoading: isLoadingCategory }] =
    useLazyGetCategoriesQuery();

  const [craeteCategory, { isLoading: isLoadingCreatedCategory }] =
    useCreateCategoryMutation();
  const [deleteCategoryById, { isLoading: isLoadingDeleteCategoryById }] =
    useDeleteCategoryByIdMutation();
  const [updateCategoryById, { isLoading: isLoadingUpdateCategoryById }] =
    useUpdateCategoryByIdMutation();
  const [tableData, setTableData] = useState<ICatagoryResponse[]>([]);
  const isLoading =
    isLoadingCreatedCategory ||
    isLoadingDeleteCategoryById ||
    isLoadingUpdateCategoryById;
  useEffect(() => {
    if (!isLoading) {
      console.log("RERENDER EFFECT");

      getCategory().then((res) => setTableData(res?.data!));
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
      updateCategoryById({ name: category?.name, id: category?.id! });
    } else {
      craeteCategory({ name: category?.name });
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
    setTableData(categoryData!);
  };

  const onCreateCategory = () => {
    if (tableData.find((data) => data?._id === "")) return;
    setTableData((prev) => [{ name: "", _id: "" }, ...prev!]);
  };
  const onDeleteCategoryById = (id: string) => {
    deleteCategoryById(id);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
      {/* <Button color="primary" variant="outlined">
           jjjj
          </Button> */}
        {/* <Button onClick={clearFilters}>Clear filters</Button> */}
        <ButtonComponent      variant="outlined" icon={<MdClearAll/>} onClick={clearFilters} buttonText="Clear filters"/>
        {/* <Button onClick={clearAll}>Clear filters and sorters</Button> */}
        <ButtonComponent      variant="outlined" icon={<MdClearAll/>} onClick={clearAll} buttonText="Clear filters and sorters"/>
        <ButtonComponent
          icon={<IoIosAddCircleOutline />}
          variant="outlined"
          buttonText="Create New Category"
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
          loading={isLoadingCategory || isLoading}
          dataSource={tableData}
          onChange={handleChange}
        />
      </Form>
    </>
  );
};

export default Category;

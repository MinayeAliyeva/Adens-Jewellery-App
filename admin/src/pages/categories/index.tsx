import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Space, Table } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdClearAll } from "react-icons/md";
import type { TableProps } from "antd";
import {
  columns,
  defaultPaginationData,
  IPaginationData,
  schema,
} from "./data";
import {
  useCreateCategoryMutation,
  useDeleteCategoryByIdMutation,
  useGetCategoriesQuery,
  useUpdateCategoryByIdMutation,
} from "../../store/api/catagory/catagory-api";
import { ICatagoryResponse } from "../../store/api/catagory/modules";
import { ButtonComponent } from "../../utils/components/ButtonComponent";
import { useGetBrandsQuery } from "../../store/api/brand/brand-api";

type OnChange = NonNullable<TableProps<ICatagoryResponse>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

export interface IFormField {
  name: string;
  id?: string;
  brand?: string;
}

interface IState {
  selectedId: string;
  createCategory: boolean;
  updateCategory: boolean;
  paginationData: IPaginationData;
  tableData: ICatagoryResponse[];
}

const Category: FC = () => {
  const [state, setState] = useState<IState>({
    selectedId: "",
    createCategory: false,
    updateCategory: false,
    paginationData: defaultPaginationData,
    tableData: [],
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IFormField>({
    resolver: state.createCategory ? yupResolver(schema) : undefined,
  });
  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetCategoriesQuery();

  const { data: brandData, isLoading: isLoadingBrand } = useGetBrandsQuery();

  const [craeteCategory, { isLoading: isLoadingCreatedCategory }] =
    useCreateCategoryMutation();
  const [deleteCategoryById, { isLoading: isLoadingDeleteCategoryById }] =
    useDeleteCategoryByIdMutation();
  const [updateCategoryById, { isLoading: isLoadingUpdateCategoryById }] =
    useUpdateCategoryByIdMutation();

  const isLoading =
    isLoadingCategory ||
    isLoadingBrand ||
    isLoadingCreatedCategory ||
    isLoadingDeleteCategoryById ||
    isLoadingUpdateCategoryById;

  useEffect(() => {
    if (categoryData?.length) {
      setState((prev) => ({ ...prev, tableData: categoryData! }));
    }
  }, [categoryData]);

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
  const onCreateCategory = useCallback(() => {
    state.paginationData = defaultPaginationData;
    reset();
    clearErrors("name");
    setState((prev) => ({
      ...(prev ?? {}),
      selectedId: "",
      createCategory: true,
      updateCategory: false,
    }));

    const findedId = state.tableData?.find((data) => data?._id === "");

    if (findedId) return;
    setState((prev) => ({
      ...(prev ?? {}),
      tableData: [{ name: "", _id: "" }, ...prev.tableData],
    }));
  }, []);

  const onFinish = useCallback(
    (category: IFormField) => {
      const findedCategory = categoryData?.find(
        (data) => data.brand === category.brand
      );

      if (state.selectedId === category.id && state.updateCategory) {
        if (!findedCategory)
          updateCategoryById({
            name: category?.name,
            id: category?.id!,
            brand: category.brand!,
          });
        setState((prev) => ({
          ...prev,
          selectedId: "",
          createCategory: false,
          updateCategory: false,
        }));
      } else {
        craeteCategory({ name: category?.name, brand: category.brand! })
          .then((res: any) => {
            if (res?.error?.data)
              setError("name", { type: "required", message: res?.error?.data });
            else {
              setState((prev) => ({
                ...prev,
                paginationData: defaultPaginationData,
                selectedId: "",
                createCategory: false,
                updateCategory: false,
              }));
            }
          })
          .catch((err) => {
            console.error("err", err);
          });
      }
    },
    [categoryData, state.selectedId, state.updateCategory]
  );

  const editCategory = (id?: string | null) => {
    reset();
    clearErrors("name");
    setState((prev) => ({
      ...prev,
      selectedId: id!,
      createCategory: false,
      updateCategory: true,
    }));
  };


  const onCancel = () => {
    reset();
    clearErrors("name");
    setState((prev) => ({
      ...prev,
      selectedId: "",
      createCategory: false,
      updateCategory: false,
    }));
  };

  const onDeleteCategoryById = (id: string) => {
    deleteCategoryById(id);
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
        editCategory,
        selectedId: state.selectedId,
        createCategory: state.createCategory,
        updateCategory: state.updateCategory,
        onCancel,
        onDeleteCategoryById,
        brandData: brandData,
      }),
    [
      errors,
      filteredInfo,
      sortedInfo,
      state.createCategory,
      state.selectedId,
      state.updateCategory,
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
          buttonText="Create New Category"
          onClick={onCreateCategory}
          disabled={state.updateCategory}
        />
      </Space>
      <Form>
        <Table<ICatagoryResponse>
          columns={memorizedColumns}
          loading={isLoadingCategory || isLoading}
          dataSource={state.tableData}
          onChange={handleChange}
          pagination={{
            pageSize: state.paginationData?.pageSize,
            current: state.paginationData?.current,
            onShowSizeChange(current, pageSize) {
              setState({
                ...state,
                paginationData: { ...state.paginationData, pageSize },
              });
            },
            onChange(page, pageSize) {
              setState({
                ...state,
                paginationData: {
                  ...state.paginationData,
                  current: page,
                  pageSize,
                },
              });
            },
          }}
        />
      </Form>
    </>
  );
};

export default memo(Category);

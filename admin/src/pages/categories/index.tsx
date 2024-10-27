import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, message, Space, Table } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdClearAll } from "react-icons/md";
import type { TableProps } from "antd";
import { map } from "lodash";
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
import { useTranslation } from "react-i18next";

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
  useEffect(() => {
    if (!errors?.name?.message) return;
    message.error(errors?.name?.message);
  }, [errors?.name?.message]);
  const onCreateCategory = useCallback(() => {
    state.paginationData = defaultPaginationData;
    reset();
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
      createCategory: true,
      paginationData: defaultPaginationData,
    }));
  }, [state.tableData]);

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
          }).then(() => {
            message.success("Ugurla yenilendi");
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
            if (res?.error?.data) message.error(res?.error?.data);
            else {
              setState((prev) => ({
                ...prev,
                paginationData: defaultPaginationData,
                selectedId: "",
                createCategory: false,
                updateCategory: false,
              }));
              message.success("Ugurla əlavə olundu");
            }
          })
          .catch((err) => {
            message.error("Category yaradarken xəta baş verdi");
          });
      }
    },
    [categoryData, state.selectedId, state.updateCategory]
  );

  const editCategory = (id?: string | null) => {
    reset();
    setState((prev) => ({
      ...prev,
      selectedId: id!,
      createCategory: false,
      updateCategory: true,
    }));
  };

  const onCancel = () => {
    reset();
    setState((prev) => ({
      ...prev,
      selectedId: "",
      createCategory: false,
      updateCategory: false,
      tableData: categoryData!,
    }));
  };

  const onDeleteCategoryById = (id: string) => {
    deleteCategoryById(id);
  };
  const { t } = useTranslation();
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
        t,
      }),
    [
      errors,
      filteredInfo,
      sortedInfo,
      state.createCategory,
      state.selectedId,
      state.updateCategory,
      t,
    ]
  );
  const tableDataSource = useMemo(
    () => map(state.tableData, (item) => ({ ...item, key: item._id })),
    [state.tableData]
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
          disabled={state.updateCategory || state.createCategory}
        />
      </Space>
      <Form>
        <Table<ICatagoryResponse>
          columns={memorizedColumns}
          loading={isLoadingCategory || isLoading}
          dataSource={tableDataSource}
          onChange={handleChange}
          pagination={{
            defaultCurrent: state.paginationData?.current,
            defaultPageSize: state.paginationData?.pageSize,
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
                createCategory: false,
                updateCategory: false,
                tableData: categoryData!,
              });
            },
          }}
        />
      </Form>
    </>
  );
};

export default memo(Category);

import { yupResolver } from "@hookform/resolvers/yup";
import { Form, message, Space, Table } from "antd";
import type { TableProps } from "antd";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdClearAll } from "react-icons/md";
import { isEmpty, map } from "lodash";
import { ICatagoryResponse } from "../../../store/api/catagory/modules";
import {
  defaultPaginationData,
  IPaginationData,
  schema,
} from "../../categories/data";
import { IBrandsResponse } from "../../../store/api/brand/modules";
import {
  useCreateBrandMutation,
  useDeleteBrandByIdMutation,
  useGetBrandsQuery,
  useUpdateBrandByIdMutation,
} from "../../../store/api/brand/brand-api";
import { ButtonComponent } from "../../../utils/components/ButtonComponent";
import { columns } from "./data";
type OnChange = NonNullable<TableProps<ICatagoryResponse>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

export interface IFormField {
  name: string;
  id?: string;
}
interface IState {
  selectedId: string;
  createBrand: boolean;
  updateBrand: boolean;
  paginationData: IPaginationData;
  Brand: IBrandsResponse[];
}
const initialValue: IState = {
  selectedId: "",
  createBrand: false,
  updateBrand: false,
  paginationData: defaultPaginationData,
  Brand: [],
};

const UserOrdertable: FC = () => {
  const { t } = useTranslation();
  const [state, setState] = useState(initialValue);

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const { data: brandData, isLoading: isLoadingBrand } = useGetBrandsQuery();

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
    if (isEmpty(brandData)) return;

    setState((prev) => ({ ...prev, Brand: brandData! }));
  }, [brandData]);

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
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

  useEffect(() => {
    if (!errors?.name?.message) return;
    message.error(errors?.name?.message);
  }, [errors?.name?.message]);


  const onFinish = (brand: IFormField) => {
    if (state.selectedId) {
      if (
        brand.id === state.selectedId &&
        brandData?.find((item) => item.name === brand.name)
      ) {
        message.error("Such brand exsits don't be updated!!!");
        return;
      }
      updateBrandById({ name: brand?.name, id: brand?.id! })
        .then(() => {
          message.success("Sucsesuflly updated!!!");
        })
        .finally(() => {
          setState((prev) => ({
            ...prev,
            selectedId: "",
            createBrand: false,
            updateBrand: false,
          }));
        });
    } else {
      craeteBrand({ name: brand?.name })
        .then((res: any) => {
          if (res?.error?.data) {
            message.error(res?.error?.data);
          } else {
            setState((prev) => ({
              ...prev,
              paginationData: defaultPaginationData,
              selectedId: "",
              createBrand: false,
              updateBrand: false,
            }));
            message.success("Ugurla əlavə olundu");
          }
        })
        .catch((err) => {
          message.error("Brand yaradarken xəta baş verdi");
        });
    }
  };

  const editBrand = (id?: string | null) => {
    reset();
    setState((prev) => ({
      ...prev,
      Brand: brandData!,
      selectedId: id!,
      createBrand: false,
      updateBrand: true,
    }));
  };

  const onCancel = () => {
    reset();
    setState((prev) => ({
      ...prev,
      selectedId: "",
      createBrand: false,
      updateBrand: false,
      Brand: brandData!,
    }));
  };
  const onDeleteBrandById = (id: string) => {
    deleteBrandById(id);
    message.success("Brand Delete!!!");
  };

  const memorizedColumns = useMemo(
    () =>
      columns({
        handleSubmit,
        onFinish,
        control,
        filteredInfo,
        setAgeSort,
        sortedInfo,
        editBrand,
        selectedId: state.selectedId,
        createBrand: state.createBrand,
        updateBrand: state.updateBrand,
        onCancel,
        onDeleteBrandById,
        t,
      }),
    [
      control,
      filteredInfo,
      setAgeSort,
      sortedInfo,
      editBrand,
      state.selectedId,
      state.createBrand,
      state.updateBrand,
      onCancel,
      onDeleteBrandById,
      t,
    ]
  );

  const tableDataSource = useMemo(
    () => map(state.Brand, (item) => ({ ...item, key: item._id })),
    [state.Brand]
  );

  return (
    <>

      <Form>
        <Table<ICatagoryResponse>
          columns={memorizedColumns}
          bordered={true}
          loading={isLoadingBrand || isLoading}
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
                createBrand: false,
                updateBrand: false,
                Brand: brandData!,
              });
            },
          }}
        />
      </Form>
    </>
  );
};

export default UserOrdertable;

import { FC, memo, useMemo, useRef } from "react";
import { Button, Input, Space, Table } from "antd";
import type { InputRef, TableColumnType, TableColumnsType } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { map } from "lodash";
import { IProduct } from '../../store/api/product/modules';

type DataIndex = keyof IProduct;
interface IProductsTableProps {
  data: IProduct[];
  columns: TableColumnsType<IProduct>;
  loading: boolean;
}
const ProductsTable: FC<IProductsTableProps> = ({ data, columns, loading}) => {
  const searchInput = useRef<InputRef>(null);
  const { t } = useTranslation();
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<IProduct> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            {t("Search")}
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys as string[], confirm, dataIndex);
            }}
            size="small"
            style={{ width: 90 }}
          >
           {t("Reset")}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            {t("Filter")}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            {t("close")}
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      return record?.[dataIndex!]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase())!;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const tableColumns = useMemo(
    () =>
      map(columns, (column) => {
        if (column.key === "mainImageUrl" || column.key === "actions") {
          return column;
        }
        return {
          ...column,
          ...getColumnSearchProps(column?.key as any),
        };
      }),
    [columns, t]
  );
  const tableDataSource = useMemo(() => map(data,item => ({ ...item, key: item._id })), [data]);
  return <Table loading={loading} columns={tableColumns} dataSource={tableDataSource}  />;
};

export default memo(ProductsTable);

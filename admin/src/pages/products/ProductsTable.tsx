import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType, TableColumnsType } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { TFunction } from "i18next";
import { map } from "lodash";
import { FC, memo, useMemo, useRef } from "react";
import { IProduct } from "../../store/api/product/modules";

type DataIndex = keyof IProduct;

const ProductsTable: FC<{
  data: IProduct[];
  columns: TableColumnsType<IProduct>;
  loading: boolean;
  t: TFunction<"translation", string>;
}> = ({ data, columns, loading, t }) => {
  const searchInput = useRef<InputRef>(null);

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
    [columns]
  );

  return <Table loading={loading} columns={tableColumns} dataSource={data} />;
};

export default memo(ProductsTable);

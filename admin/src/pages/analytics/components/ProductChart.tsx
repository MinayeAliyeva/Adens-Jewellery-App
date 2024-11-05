import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { IProduct } from "../../../store/api/product/models";
import { SpinComponent } from "../../../utils/components/SpinComponent";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useGetProductsQuery } from "../../../store/api/product/product-api";

interface CategoryData {
  category: string;
  totalStock: number;
  totalSales: number;
}

const aggregateData = (productList: IProduct[]) => {
  const categoryMap: { [key: string]: CategoryData } = {};
  productList.forEach((product) => {
    const categoryName = product.category.name;
    const totalStock = productList.reduce((acc, curr) => {
      if (curr.category.name === categoryName) {
        acc += curr.totalQty;
      }
      return acc;
    }, 0);
    const totalSales = productList?.reduce((acc, curr) => {
      if (curr.category.name === categoryName) {
        acc += curr.price * curr.totalQty;
      }
      return acc;
    }, 0);

    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = {
        category: categoryName,
        totalStock,
        totalSales,
      };
    }
  });

  return Object.values(categoryMap);
};

const ProductChart = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetProductsQuery();

  const chartData = aggregateData(data ?? []);

  return (
    <SpinComponent loading={isLoading}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />
          <YAxis
            yAxisId="left"
            domain={[0, "auto"]}
            ticks={[
              5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
              90, 95, 100,
            ]}
            interval="preserveEnd"
            label={{
              value: t("Total Stock"),
              angle: -90,
              position: "insideLeft",
            }}
          />

          <YAxis
            dataKey="category"
            yAxisId="right"
            orientation="right"
            domain={[0, "auto"]}
            ticks={[150, 350, 550, 750, 1000, 1500, 2000]}
            interval="preserveEnd"
            label={{
              value: t("Total Sales"),
              angle: 90,
              position: "insideRight",
            }}
          />

          <Tooltip />
          <Legend />

          <Bar
            yAxisId="left"
            dataKey="totalStock"
            fill="#82ca9d"
            name={t("total stock")}
          />
          <Bar
            yAxisId="right"
            dataKey="totalSales"
            fill="#ff7300"
            name={t("profit sales")}
          />
        </BarChart>
      </ResponsiveContainer>
    </SpinComponent>
  );
};

export default memo(ProductChart);

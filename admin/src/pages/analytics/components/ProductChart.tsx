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
import { IProduct } from "../../../store/api/product/modules";
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
    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = {
        category: categoryName,
        totalStock: productList.filter((p) => p.category.name === categoryName)
          .length,
        totalSales: product.price * product.totalQty,
      };
    }
    categoryMap[categoryName].totalSales += product.price * product.totalQty;
  });

  return Object.values(categoryMap);
};

const ProductChart= () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetProductsQuery();

  const chartData = aggregateData(data??[]);

  return (
    <SpinComponent loading={isLoading}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalStock" fill="#82ca9d" name={t("total stock")} />
          <Bar dataKey="totalSales" fill="#ff7300" name={t("profit sales")} />
        </BarChart>
      </ResponsiveContainer>
    </SpinComponent>
  );
};

export default memo(ProductChart);

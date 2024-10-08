import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useGetCategoriesQuery } from "../../store/api/catagory/catagory-api";
import { useLazyGetProductsQuery } from "../../store/api/product/product-api";

const App: React.FC = () => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const [getProductByCategory, { data }] = useLazyGetProductsQuery();

  const handleChange = (selectedCategories: string[]) => {
    console.log(`Selected categories: ${selectedCategories}`);
    if (selectedCategories.length > 0) {
      getProductByCategory({ categoryNames: selectedCategories });
    }
  };

  const options: SelectProps["options"] = categoriesData
    ? categoriesData.map((category: { _id: string; name: string }) => ({
        value: category.name,
        label: category.name,
      }))
    : [];
  console.log("DATA", data);

  return (
    <Select
      style={{ width: "100%" }}
      placeholder="Select Category"
      onChange={handleChange}
      options={options}
      mode="multiple"
      size="large"
    />
  );
};

export default App;

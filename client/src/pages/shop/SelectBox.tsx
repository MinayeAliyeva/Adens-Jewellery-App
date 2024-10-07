// import React from "react";
// import { Select, Space } from "antd";
// import { useLazyGetProductsQuery } from "../../store/api/product/product-api";

// const options = [
//   {
//     label: "Uzuk",
//     value: "uzuk",
//     emoji: "🇨🇳",
//     desc: "Uzuk",
//   },
//   {
//     label: "Sirqa",
//     value: "Sirqa", 
//     emoji: "🇨🇳",
//     desc: "Sirqa",
//   },
// ];

// const SelecBox: React.FC = () => {
//   const [trigger, { data }] = useLazyGetProductsQuery();

//   const handleChange = (value: string[]) => {
//     console.log(`Selected: ${value}`);
//     trigger({ categoryName: value }); 
//   };

//   console.log("data", data);

//   return (
//     <Select
//       mode="multiple"
//       style={{ width: "100%" }}
//       placeholder="Select category"
//       onChange={handleChange}
//       options={options}
//       optionLabelProp="label"
//       optionRender={(option) => (
//         <Space>
//           <span>{option?.label}</span>
//         </Space>
//       )}
//     />
//   );
// };

// export default SelecBox;
import React from 'react'

const SelectBox = () => {
  return (
    <div>SelectBox</div>
  )
}

export default SelectBox
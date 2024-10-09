import { FaUsers } from "react-icons/fa";
import { CgProductHunt } from "react-icons/cg";
import { TbCategoryFilled } from "react-icons/tb";
import { SiSimpleanalytics } from "react-icons/si";
export const menu = [
  {
    title: "Products",
    icon: <CgProductHunt />,
    path: "products",
  },

  {
    title: "Categories",
    icon: <TbCategoryFilled />,
    path: "categories",
  },
  {
    title: "Brand",
    icon: <TbCategoryFilled />,
    path: "brands",
  },
  {
    title: "Analytics",
    icon: <SiSimpleanalytics />,
    path: "analytics",
  },
  {
    title: "Users",
    icon: <FaUsers />,
    path: "users",
  },
];

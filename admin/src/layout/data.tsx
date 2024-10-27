import { FaUsers } from "react-icons/fa";
import { CgProductHunt } from "react-icons/cg";
import { TbCategoryFilled } from "react-icons/tb";
import { SiSimpleanalytics } from "react-icons/si";
import { TbBrandBunpo } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
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
    title: "Brands",
    icon: <TbBrandBunpo />,
    path: "brands",
  },

  {
    title: "Users",
    icon: <FaUsers />,
    path: "users",
  },

  {
    title: "Analytics",
    icon: <SiSimpleanalytics />,
    path: "analytics",
  },
  {
    title: "Settings",
    icon: <IoMdSettings />,
    path: "settings",
  },
];

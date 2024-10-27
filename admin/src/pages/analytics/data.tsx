import ProductChart from "./components/ProductChart";
import ProfitChart from "./components/ProfitChart";
import SalesChart from "./components/SalesChart";

export const salesData = [
  { name: "Jan", sales: 4000, profit: 2400 },
  { name: "Feb", sales: 3000, profit: 1398 },
  { name: "Mar", sales: 2000, profit: 9800 },
  { name: "Apr", sales: 2780, profit: 3908 },
  { name: "May", sales: 1890, profit: 4800 },
  { name: "Jun", sales: 2390, profit: 3800 },
  { name: "Jul", sales: 3490, profit: 4300 },
];

export const tabsData = [
    {
        key: '1',
        label: 'Products Chart',
        children:  <ProductChart  />,
    },
    {
        key: '2',
        label: 'Sales Chart',
        children: <SalesChart />,
    },
    {
        key: '3',
        label: 'Profit Chart',
        children:  <ProfitChart />,
    },
];

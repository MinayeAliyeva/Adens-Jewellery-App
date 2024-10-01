import TableComponent from "./TableComponent"
import XTable from "./TestTable"

const tableData =[{
  image: 'TTTT',
  productName: 'TTTT',
  description: 'TTTT',
  price: 78,
  category: 'TTTT',
  test: {
    age: 20,
  },
  id: '67',

}];

const columns = [
  {
    title: "Product",
    key: "product",
    render: (text: any, record: any) => {
      console.log("record", record);
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record?.image}
            alt={record?.productName}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <span>{record?.productName}</span>
          <div>
           x
          </div>
        </div>
      );
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "action",
    key: "action",
    render: (text: any, record: any) => {
      console.log("record", record);
      return (
        // <div style={{ display: "flex", alignItems: "center" }}>
        //   <img
        //     src={record?.image}
        //     alt={record?.productName}
        //     style={{ width: 50, height: 50, marginRight: 10 }}
        //   />
        //   <span>{record?.productName}</span>
          <div>
           x
          </div>
        // </div>
      );
    },
  },
];

const Products = () => {
  return (
   <>
  <TableComponent/>
  <XTable data={tableData} columns={columns} actions='x'/>
   </>
  )
}

export default Products
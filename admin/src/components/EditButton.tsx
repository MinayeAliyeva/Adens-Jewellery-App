import React, { useState } from "react";
import { Button, Modal, Input } from "antd";

const App = ({ record }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    productName: record?.productName || "",
    description: record?.description || "",
    price: record?.price || 0,
    category: record?.category || "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
          placeholder="Product Name"
          style={{ marginBottom: "10px" }}
        />
        <Input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          style={{ marginBottom: "10px" }}
        />
        <Input
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          type="number"
          style={{ marginBottom: "10px" }}
        />
        <Input
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Category"
          style={{ marginBottom: "10px" }}
        />
      </Modal>
    </>
  );
};

export default App;

import { FC } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import React, { useState } from "react";
import { UploadFile } from "antd/es/upload/interface";
import { useAddProductMutation } from "../../store/api/product/product-api";

interface IProductDialog {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDialog: FC<IProductDialog> = ({ open, setOpen }) => {
  const [addProduct, { data, isLoading, isError }] = useAddProductMutation();
  const [form] = Form.useForm();
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]); // Seçilen dosyayı alıyoruz
    }
  };

  // Form gönderme işlemi
  const onFinish = async (values: any) => {
    const formData = new FormData();
    // Form verilerini ekleme
    formData.append("productName", values.productName);
    formData.append("size", values.size || "");
    formData.append("price", values.price);
    formData.append("measure", values.measure || "");
    formData.append("categoryName", values.categoryName || "");
    formData.append("color", values.color || "");
    formData.append("brand", values.brand || "");
    formData.append("description", values.description || "");
    formData.append("stock", values.stock || 0);
    formData.append("weight", values.weight || 0);
    formData.append("dimensions", values.dimensions || 0);
    formData.append("favorite", values.favorite);
    formData.append("warrantyDuration", values.warrantyDuration || "");
    formData.append("returnPolicy", values.returnPolicy || "");
    formData.append("relatedProducts", values.relatedProducts || "");
    formData.append("creationDate", values.creationDate || "");
    formData.append("popularity", values.popularity || 0);
    formData.append("viewing", values.viewing || 0);
    
    // Ana görsel ekleme
    if (selectedFile) {
      formData.append("mainImageUrl", selectedFile); // Ana görseli ekliyoruz
    }

    // Ürünü backend'e gönderme
    try {
      await addProduct(formData);
      setOpen?.(false);
      console.log("Ürün başarıyla eklendi!");
    } catch (error) {
      console.error("Ürün eklenirken hata oluştu:", error);
    }
  };

  return (
    <>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen?.(false)}
        onCancel={() => setOpen?.(false)}
        width={1000}
      >
        <Form
          form={form}
          name="create-product"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ favorite: false }}
        >
          <Form.Item
            label="Ürün İsmi"
            name="productName"
            rules={[{ required: true, message: "Ürün ismi gerekli!" }]}
          >
            <Input placeholder="Ürün İsmini Giriniz" />
          </Form.Item>

          <Form.Item label="Beden" name="size">
            <Input placeholder="Ürün Bedeni (isteğe bağlı)" />
          </Form.Item>

          <Form.Item
            label="Fiyat"
            name="price"
            rules={[{ required: true, message: "Fiyat gerekli!" }]}
          >
            <InputNumber
              placeholder="Fiyatı Giriniz"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Ölçü" name="measure">
            <InputNumber
              placeholder="Ölçüyü Giriniz"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Kategori İsmi" name="categoryName">
            <Input placeholder="Kategori İsmini Giriniz" />
          </Form.Item>

          <Form.Item label="Renk" name="color">
            <Input placeholder="Renk Giriniz" />
          </Form.Item>

          <Form.Item label="Marka" name="brand">
            <Input placeholder="Markayı Giriniz" />
          </Form.Item>

          <Form.Item label="Açıklama" name="description">
            <Input.TextArea placeholder="Ürün Açıklamasını Giriniz" rows={4} />
          </Form.Item>

          <Form.Item label="Stok Durumu" name="stock">
            <InputNumber
              placeholder="Stok Miktarını Giriniz"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Ağırlık (kg)" name="weight">
            <InputNumber
              placeholder="Ürün Ağırlığını Giriniz"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Boyutlar (Çap mm)" name="dimensions">
            <InputNumber placeholder="Çapı Giriniz" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Favori" name="favorite" valuePropName="checked">
            <Checkbox>Bu ürünü favori yap</Checkbox>
          </Form.Item>

          <Form.Item label="Garanti Süresi" name="warrantyDuration">
            <Input placeholder="Garanti Süresini Giriniz" />
          </Form.Item>

          <Form.Item label="İade Şartları" name="returnPolicy">
            <Input placeholder="İade Şartlarını Giriniz" />
          </Form.Item>

          <Form.Item label="İlgili Ürünler" name="relatedProducts">
            <Input placeholder="İlgili Ürünleri Giriniz (ID ya da İsim)" />
          </Form.Item>

          <Form.Item label="Satış Tarihi" name="creationDate">
            <DatePicker showTime />
          </Form.Item>

          <Form.Item label="Ürün Popülerliği" name="popularity">
            <InputNumber
              placeholder="Popülerlik Skoru"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="İzlenme Sayısı" name="viewing">
            <InputNumber
              placeholder="İzlenme Sayısı"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Ana Görsel Yükleme */}
          <Form.Item
            label="Ana Görsel"
            name="mainImageUrl"
            rules={[{ required: true, message: "Ana görsel gerekli!" }]}
          >
            <input type="file" onChange={handleFileChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ürünü Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductDialog;

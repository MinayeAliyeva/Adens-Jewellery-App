import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
//!extends
interface IUploadImagesComponentProps {
  handleChange?: (info: UploadChangeParam<UploadFile<File>>) => void;
  control: any;
  name?: string;
  rules?: Record<string, any>;
}
const UploadImagesComponent: FC<IUploadImagesComponentProps> = ({
  handleChange,
  control,
  name = "upload",
  ...rest
}) => {
  return (
    <div className="input-container">
      <Controller
        name={name}
        control={control}
        rules={rest.rules}
        render={({ field, fieldState }) => (
          <Upload
            {...field}
            className={
              fieldState.invalid ? "custom-input error" : "custom-input"
            }
            accept="image/*"
            showUploadList={true}
            onChange={handleChange}
            beforeUpload={() => false}
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Main Image</Button>
          </Upload>
        )}
      />
    </div>
  );
};

export default UploadImagesComponent;

import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload"; 
import { ButtonComponent } from "./ButtonComponent";

interface IUploadImagesComponentProps extends UploadProps {
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
            {...rest} 
            className={
              fieldState.invalid ? "custom-input error" : "custom-input"
            }
            accept="image/*"
            showUploadList={true}
            onChange={(info) => {
              if (handleChange) handleChange(info); 
              field.onChange(info.fileList); 
            }}
            beforeUpload={() => false} 
            maxCount={1}
            listType="picture"
          >
            <ButtonComponent buttonText="Upload Main Image" icon={<UploadOutlined />} />
          </Upload>
        )}
      />
    </div>
  );
};

export default UploadImagesComponent;

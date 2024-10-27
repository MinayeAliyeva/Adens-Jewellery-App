import {
  Upload,
  Button,
  message,
  UploadProps,
  UploadFile,
  Row,
  Col,
} from "antd";
import ImgCrop from "antd-img-crop";
import {
  useGetLogoQuery,
  useCreateLogoMutation,
  useUpdateLogoMutation,
  useDeleteLogoMutation,
} from "../../store/api/setting/setting-api";
import { ILogos } from "../../store/api/setting/modules";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
const defaultLogo =
  "http://localhost:8080/public/logoImg/1729960022891_adenaLogo.png";

const Logo: React.FC = () => {
  const { data: logoData } = useGetLogoQuery();
  const [createLogo] = useCreateLogoMutation();
  const [updateLogo] = useUpdateLogoMutation();
  const [deleteLogo] = useDeleteLogoMutation();

  const handleCreate = (fileList: UploadFile[]) => {
    if (!fileList[0]) return message.warning("Yükləmək üçün logo seçin.");
    const formData = new FormData();
    formData.append("logo", fileList[0].originFileObj as File);

    try {
      createLogo(formData).then(() => {
        message.success("Logo uğurla yaradıldı.");
      });
    } catch (error) {
      message.error("Logo yaradılarkən səhv baş verdi.");
    }
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    handleCreate(newFileList);
  };

  const handleUpdate = (logoId: string) => {
    try {
      updateLogo({ logoId }).then(() => {
        message.success("Logo uğurla yeniləndi.");
      });
    } catch (error) {
      message.error("Logo yenilənərkən səhv baş verdi.");
    }
  };

  const handleDelete = (logoId: string) => {
    try {
      deleteLogo({ logoId }).then(() => {
        message.success("Logo uğurla silindi.");
      });
    } catch (error) {
      message.error("Logo silinərkən səhv baş verdi.");
    }
  };

  return (
    <div>
      <ImgCrop rotationSlider>
        <Upload listType="picture-card" fileList={[]} onChange={onChange}>
          '+ Upload'
        </Upload>
      </ImgCrop>

      <Row style={{ gap: "20px" }}>
        {" "}
        {logoData?.[0]?.logos?.map((logo: ILogos) => (
          <Col key={logo._id}>
            <div>
              <img
                src={logo.url}
                alt={logo._id}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "contain",
                }}
              />
              <br /> <br />
              <Button onClick={() => handleUpdate(logo._id)} type="default">
                <GrUpdate />
              </Button>
              <Button
                onClick={() => handleDelete(logo._id)}
                type="dashed"
                disabled={logo.url === defaultLogo}
              >
                <MdDelete />
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Logo;

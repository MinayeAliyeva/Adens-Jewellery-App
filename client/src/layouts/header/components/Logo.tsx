import { Link } from "react-router-dom";
import { useGetLogoQuery } from "../../../redux/api/logo/logo-api";
import { Image, Spin } from "antd";
const logo = "/assets/images/logo.png";

export const Logo = () => {
  const { data: logoData, isLoading } = useGetLogoQuery();
  const logoUrl = logoData?.[0]?.currentlyLogo || logo;
  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <Link to="/home">
          <Image
            preview={false}
            src={logoUrl}
            alt="logo"
            loading="lazy"
            style={{ width: "130px" }}
          />
        </Link>
      )}
    </>
  );
};

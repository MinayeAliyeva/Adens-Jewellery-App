import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import logo from "../../../assets/images/logo.png";
import {
  SearchOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import useDropdown from "../../../hooks/openMenuDropdown";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { menuItems, navLinks } from "../../../constants";

export default function PrimarySearchAppBar() {
  const { visible, toggleDropdown, closeDropdown } = useDropdown();
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    if (e.key === "register") {
      navigate("/register");
    }
    if (e.key === "login") {
      navigate("/login");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white !important" }}>
        <Toolbar className="py-4"> {/* Padding artırıldı */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <img src={logo} className="w-24" alt="logo" /> {/* Genişlik ayarlandı */}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-black text-lg" // Yazı rengi ve boyutu ayarlandı
              >
                {link.label}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="search">
              <SearchOutlined className="text-xl" /> {/* Simge boyutu ayarlandı */}
            </IconButton>
            <Dropdown
              overlay={menu}
              visible={visible}
              trigger={["click"]}
              onVisibleChange={closeDropdown}
            >
              <IconButton
                size="large"
                aria-label="user menu"
                onClick={toggleDropdown}
              >
                <UserOutlined className="text-xl" />
              </IconButton>
            </Dropdown>
            <IconButton
              size="large"
              aria-label="favorite items"
              onClick={handleMenuClick}
            >
              <HeartOutlined className="text-xl" />
            </IconButton>
            <IconButton
              size="large"
              aria-label="shopping cart"
              onClick={handleMenuClick}
            >
              <ShoppingCartOutlined className="text-xl" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

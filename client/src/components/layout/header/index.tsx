import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import logo from "../../../assets/images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <img src={logo} style={{ width: "100px" }} alt="logo" />
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
                style={{ textDecoration: "none", color: "#000" }}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="search">
              <SearchIcon />
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
                <PersonOutlineIcon />
              </IconButton>
            </Dropdown>
            <IconButton
              size="large"
              aria-label="favorite items"
              onClick={handleMenuClick}
            >
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="shopping cart"
              onClick={handleMenuClick}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

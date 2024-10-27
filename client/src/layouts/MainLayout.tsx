import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Container from "../shared/components/Container";
const MainLayout = () => {
  
  return (
    <>
      <Container height="5vh" backgroundColor="#fff">
        <Header />
      </Container>

      <Container height="80vh" backgroundColor="#fff">
        <Outlet />
      </Container>

      <Container height="15vh">
        <Footer />
      </Container>
    </>
  );
};

export default MainLayout;

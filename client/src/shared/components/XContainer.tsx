import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const XContainer = ({
  minWidth = "100%",
  height = "100vh",
  sx = {},
  children,
}: any) => {
  return (
    <>
      <Container sx={{ minWidth }}>
        <Box sx={{  height, ...sx }}>{children}</Box>
      </Container>
    </>
  );
};

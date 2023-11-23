import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader({ status }) {
  return (
    <>
      <Box className="flex justify-center items-center">
        <CircularProgress className="!text-white" />
      </Box>
    </>
  );
}

import { useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import MotionHoc from "./MotionHoc";

import 'react-calendar/dist/Calendar.css';
import { Box } from "@mui/material";

const Calender = () => {

  return (
    <>
        <Sidebar/>
        {/* calender of present date day and year and with  the time */}
        <Box sx={{ml:50, pt:25}}> 
            
        </Box>
    </>
  );
};

// const Calender = MotionHoc(CalenderComponent);

export default Calender;

import { useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import MotionHoc from "./MotionHoc";

import 'react-calendar/dist/Calendar.css';
import { Box } from "@mui/material";
import FedbackFromUser from "../Feedbacks/feedbacks";

const feedback = () => {

  return (
    <>
        <Sidebar/>
        {/* calender of present date day and year and with  the time */}
        
            <FedbackFromUser/>

    </>
  );
};

// const Calender = MotionHoc(CalenderComponent);

export default feedback;

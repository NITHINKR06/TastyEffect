import { Box } from "@mui/material";
import Sidebar from "../Sidebar/sidebar";

const Home = () => {
  return   (
    <>
    <Sidebar/>
    <Box sx={{justifyContent:'center', alignItems:'center'}}>
      <h1>hii</h1>
        
    </Box>
    </>
  );
};

// const Home = MotionHoc(HomeComponent);

export default Home;

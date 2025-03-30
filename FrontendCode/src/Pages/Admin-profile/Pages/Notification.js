import Subnotify from "../Notifecations/subnotify";
import Sidebar from "../Sidebar/sidebar";
import MotionHoc from "./MotionHoc";

const Projects = () => {
  return (
    <>
        <Sidebar/>
        <Subnotify/>
    </>
  );
};

// const Projects = MotionHoc(ProjectsComponent);

export default Projects;

import { IoHome } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import RestaurantIcon from '@mui/icons-material/Restaurant';

export const MenuItems = [
  {
    title: "Home",
    url: "/",
    cName: "nav-links",
    icon: <IoHome />,
  },
  {
    title: "Shop",
    url: "/shop",
    cName: "nav-links",
    icon: <FaCartShopping />,
  },
  {
    title: "About",
    url: "/aboutus",
    cName: "nav-links",
    icon: <MdContacts />,
  },
  {
    title: "Recipes",
    cName: "nav-links",
    icon: <RestaurantIcon  sx={{fontSize:'medium'}}/>,
    url: "/allrecipe",
   
  },
  {
    title: "Profile",
    url: "/profile",
    cName: "nav-links",
    icon: <CgProfile />,
  },
];




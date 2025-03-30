import React, { useState } from "react";
// import "../../components/NavbarStyles.css";
import { MenuItems } from "../../components/MenuItems";
import { Link } from "react-router-dom";
import './navstyle.css'

import SearchIconWrapper from '@mui/icons-material/Search';
import SearchIcon from '@mui/icons-material/Search';
import StyledInputBase from '@mui/material/InputBase';
import { Button } from "@mui/material";

import { IoReorderThree } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
// import SearchBar from "./SearchBar";

function Navbarhome() {

  const [clicked, setClicked] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    setButtonVisible(!isButtonVisible);
  };

  return (
    <>
      {/* <div style={{marginBottom:'150px'}}> */}
      {/* </div> */}
      <div className="NavbarItem1" style={{justifyContent:'center', alignItems:'center'}} >
        <nav className="NavbarItem">
        <h2 className="navbar-logo" style={{fontSize:'35px'}}>Tasty Effect</h2>

        <ul className={clicked ? "nav-menu active" : "nav-menu"} style={{marginLeft:'170px', gap:'2px'}}>
          {MenuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.url} className={item.cName}>
                <div className="ni-div" style={{textAlign:'center', alignItems:'center', justifyContent:'center'}}>
                  <i>{item.icon}</i>
                  <span>{item.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {isButtonVisible && (
          <button className="hello" onClick={handleClick}>
            {/* <IoReorderThree /> */}
          </button>
        )}
        {!isButtonVisible && (
          <button className="hello" onClick={handleClick}>
            {/* <FaXmark /> */}
          </button>
        )}
      </nav>
    </div>
    </>
  );
}

export default Navbarhome;

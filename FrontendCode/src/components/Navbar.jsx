import React, { useState } from "react";
import "./NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";

import SearchIconWrapper from '@mui/icons-material/Search';
import SearchIcon from '@mui/icons-material/Search';
import StyledInputBase from '@mui/material/InputBase';
import { Button } from "@mui/material";

import { IoReorderThree } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
// import SearchBar from "./SearchBar";

function Navbarhome() {

  const [clicked, setClicked] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);

  const handleClick = () => {
    setClicked(!clicked);
    setButtonVisible(!isButtonVisible);
  };

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">Tasty Effect</h1>

      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.url} className={item.cName}>
              <div className="ni-div">
                <i>{item.icon}</i>
                <span>{item.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* <SearchBar className="search"/> */}

      {isButtonVisible && (
        <button className="hello" onClick={handleClick}>
          <IoReorderThree />
        </button>
      )}
      {!isButtonVisible && (
        <button className="hello" onClick={handleClick}>
          <FaXmark />
        </button>
      )}
    </nav>
  );
}

export default Navbarhome;

import React, { useState } from "react";
import "./NavStyles.css";
import { MenuItems } from "../MenuItems";
import { Link } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import SearchBar from "./SearchBar";

function Navbarhome() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div>
        <div className="navbar-wrapper">
        <nav className={`NavbarItems ${clicked ? "active" : ""}`}>
          <h1 className="navbar-logo">Tasty Effect</h1>

          <div className="menu-icons" onClick={handleClick}>
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>

          <ul className="nav-menu">
            {MenuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.url} className={item.cName}>
                  <div className="ni-div" style={{alignItems:'center', justifyContent:'center'}}>
                    <i>{item.icon}</i>
                    <span>{item.title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="search">
            <SearchBar />
          </p>

          <button className="hello" onClick={handleClick}>
            {clicked ? <FaXmark /> : <IoReorderThree />}
          </button>
        </nav>
      </div>
      <div className="onScroll">

      </div>
    </div>
  );
}

export default Navbarhome;

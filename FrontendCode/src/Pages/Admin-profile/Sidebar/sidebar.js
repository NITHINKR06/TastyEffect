import React, { useState } from "react";

//All the svg files
import logo from "../assets/logo.svg";
import Home from "../assets/home-solid.svg";
import Team from "../assets/social.svg";
import Calender from "../assets/sceduled.svg";
import Projects from "../assets/starred.svg";
import Documents from "../assets/draft.svg";
import PowerOff from "../assets/power-off-solid.svg";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import FeedbackIcon from '@mui/icons-material/Feedback';
import adminImage from './vecteezy_transparent-business-development-icon_16017384.png'

const Container = styled.div`
  width: 100px;
  position: fixed;
  margin-left: 3px;

  .active {
    border-right: 4px solid var(--white);

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;

const Button = styled.button`
  background-color: var(--black);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.8rem 0 0 2rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
  background-color: var(--black);
  width: 4rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 30px 30px 30px 30px;
  padding: 1.5rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;
`;

const Logo = styled.div`
  width: 1rem;

  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: var(--white);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);

  padding: 2rem 0;

  position: absolute;
  top: 6rem;
  left: 0;

  width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;

  display: flex;
  padding-left: 1rem;

  &:hover {
    border-right: 4px solid var(--white);

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }

  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? "13rem" : "4rem")};
  height: 3rem;

  padding: 0.5rem 1rem;
  /* border: 2px solid var(--white); */
  border-radius: 150px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? "9.5rem" : "0")};

  background-color: var(--white);
  color: var(--black);

  transition: all 0.3s ease;

  img {
    width: 3rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    display: inline-block;
  }

  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--grey);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;

  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => setprofileClick(!profileClick);

  const menuItems = [
    { to: '/adminProfile', text: 'Home', imgSrc: Home },
    { to: '/team', text: 'Users', imgSrc: Team },
    { to: '/documents', text: 'Recipe Manage', imgSrc: Documents },
    { to: '/notification', text: 'Notification', imgSrc: Projects },
    { to: '/feedbacks', text: 'Feddbacks', imgSrc: Calender },
  ];

  return (
    <Container>
      <Button clicked={click} onClick={() => handleClick()} >
        
      </Button>
      <SidebarContainer>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        <SlickBar clicked={click}>
        {menuItems.map((item, index) => (
          <Item
            key={index}
            onClick={() => setClick(false)}
            activeClassName="active"
            to={item.to}
          >
            <img src={item.imgSrc} alt={item.text} />
            <Text clicked={click}>{item.text}</Text>
          </Item>
        ))}
      </SlickBar>

        <Profile clicked={profileClick}>
          <img
            onClick={() => handleProfileClick()}
            src={adminImage}
            alt="Profile"
          />
          <Details clicked={profileClick}>
            <Name>
              <h5>Nithin&nbsp;</h5>
              <a href="">view&nbsp;profile</a>
            </Name>

            <Link to={'/'}>
              <Logout>
                <img src={PowerOff} alt="logout" />
              </Logout>
            </Link>
          </Details>
        </Profile>
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;

import React from "react";
import Menu from "./Menu";
import Logo from "../../images/logo_ngang.png";
import { useSelector } from "react-redux";

const Header = () => {

  const auth = useSelector((state) => state.auth)

  return (
    <div style={{paddingRight: "20px"}}>
      <div className="logo">
        <img src={Logo} width={200} alt="logo_admin" />
        <h5>ADMIN DASHBOAD</h5>
      </div>
      <Menu />
      <div className="d-flex align-items-center p-2" style={{background: "#ccc"}}>
        <img src={auth.user.profilePicture} height={50} width={50} alt="user_header"/>
        <span style={{marginLeft: "10px"}}>{auth.user.username}</span>
      </div>
    </div>
  );
};

export default Header;

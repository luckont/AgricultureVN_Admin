import React from "react";
import Menu from "./Menu";
import Logo from "../../images/logo_ngang.png";

const Header = () => {
  return (
    <div style={{paddingRight: "20px"}}>
      <div className="logo">
        <img src={Logo} width={200} alt="logo_admin" />
        <h5>ADMIN DASHBOAD</h5>
      </div>
      <Menu />
    </div>
  );
};

export default Header;

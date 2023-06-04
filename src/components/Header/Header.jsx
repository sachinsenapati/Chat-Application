import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import Profile from "../Profile/Profile";
import SearchDrawer from "../Search/SearchDrawer";
import "./Header.css";
import { useChatState } from "../../store/slice/ChatSlice";

const Header = () => {
  const {user}=useChatState()
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [isOpenSideDrawer, setOpenSideDrawer] = useState(false);

  const toggleProfile = () => {
    setOpenProfile(!isOpenProfile);
  };

  const toggleSideDrawer = () => {
    setOpenSideDrawer(!isOpenSideDrawer);
  };

  return (
    <div>
      <div className="header">
        <div className="search" onClick={toggleSideDrawer}>
          <BiSearchAlt2 className="search-icon" />
          <div>Search User</div>
        </div>
        <h2 className="chatApplication-name">Chat Application</h2>
        <div className="header-menu">
          <BsFillBellFill className="notification-icon" />
          <img
            className="profile-img"
            src={user.pic}
            alt="profile-img"
            onClick={toggleProfile}
          />
        </div>
      </div>
      {isOpenProfile && <Profile setOpen={setOpenProfile} />}
      {isOpenSideDrawer && (
        <SearchDrawer setOpenSideDrawer={setOpenSideDrawer} />
      )}
    </div>
  );
};

export default Header;

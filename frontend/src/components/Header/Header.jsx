import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import Profile from "../Profile/Profile";
import SearchDrawer from "../Search/SearchDrawer";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";

import "./Header.css";
import { useDispatch } from "react-redux";
import {
  setNotification,
  setSelectedChat,
  useChatState,
} from "../../store/slice/ChatSlice";
import { getSender } from "../../config/chatLogic";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, notification } = useChatState();
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [isOpenProfileButton, setOpenProfileButton] = useState(false);
  const [isOpenSideDrawer, setOpenSideDrawer] = useState(false);
  const [isOpenNotification, setOpenNotification] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleProfileButton = () => {
    setOpenProfileButton(!isOpenProfileButton);
  };
  const toggleProfile = () => {
    setOpenProfile(!isOpenProfile);
  };

  const toggleSideDrawer = () => {
    setOpenSideDrawer(!isOpenSideDrawer);
  };

  const toggleNotification = () => {
    setOpenNotification(!isOpenNotification);
  };

  const handleNotificationClick = (notifi) => {
    toggleNotification();
    dispatch(setSelectedChat(notifi.chat));
    dispatch(setNotification(notification.filter((n) => n !== notifi)));
  };

  const handleProfileClick = () => {
    toggleProfile();
    toggleProfileButton();
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
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
          <div className="notification" onClick={toggleNotification}>
            {/* <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            /> */}
            <BsFillBellFill className="notification-icon" />
            <div
              className={`notification-dropdown ${
                isOpenNotification ? "open" : ""
              }`}
            >
              {!notification.length ? (
                <div onClick={toggleNotification}>No New Messages</div>
              ) : (
                notification.map((notifi) => (
                  <div
                    key={notifi._id}
                    onClick={() => handleNotificationClick(notifi)}
                  >
                    {notifi.chat.isGroupchat
                      ? `New message in ${notifi.chat.chatName}`
                      : `New Message from ${getSender(
                          user.id,
                          notifi.chat.users
                        )}`}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="profile">
            <img
              className="profile-img"
              src={user.pic}
              alt="profile-img"
              onClick={toggleProfileButton}
            />
            <div
              className={`profile-dropdown ${
                isOpenProfileButton ? "open" : ""
              }`}
            >
              <div onClick={handleProfileClick}>My Profile</div>
              <div onClick={handleLogout}>Logout</div>
            </div>
          </div>
        </div>
      </div>
      {isOpenProfile && <Profile setOpen={setOpenProfile} user={user} />}
      {isOpenSideDrawer && (
        <SearchDrawer setOpenSideDrawer={setOpenSideDrawer} />
      )}
    </div>
  );
};

export default Header;

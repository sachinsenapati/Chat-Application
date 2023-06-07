import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import Profile from "../Profile/Profile";
import SearchDrawer from "../Search/SearchDrawer";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

import "./Header.css";
import {
  setNotification,
  setSelectedChat,
  useChatState,
} from "../../store/slice/ChatSlice";
import { getSender } from "../../config/chatLogic";
import { useDispatch } from "react-redux";

const Header = () => {
  const { user, notification } = useChatState();
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [isOpenSideDrawer, setOpenSideDrawer] = useState(false);
  const [isOpenNotification, setOpenNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const dispatch = useDispatch();
  const toggleProfile = () => {
    setOpenProfile(!isOpenProfile);
  };

  const toggleSideDrawer = () => {
    setOpenSideDrawer(!isOpenSideDrawer);
  };

  const toggleNotification = () => {
    setOpenNotification(!isOpenNotification);
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
          <div className={`notification ${isOpenNotification ? "open" : ""}`}>
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />
            <BsFillBellFill
              className="notification-icon"
              onClick={toggleNotification}
            />
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
                    onClick={() => {
                      toggleNotification(); // Call the toggleNotification function
                      dispatch(setSelectedChat(notifi.chat));
                      dispatch(
                        setNotificationCount(
                          notification.filter((n) => n !== notifi)
                        )
                      );
                    }}
                    style={{ cursor: "pointer" }}
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

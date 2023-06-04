import "./Profile.css";
import React from 'react'

const Profile = ({setOpen}) => {
  return (
    <div
      className="profile-modal"
      onClick={(e) => {
        if (e.target.className === "profile") setOpen();
      }}
    >
      <div className="profile"></div>
    </div>
  );
};

export default Profile

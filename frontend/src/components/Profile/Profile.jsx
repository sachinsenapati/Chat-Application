import "./Profile.css";
import React from 'react'

const Profile = ({setOpen,user}) => {
  return (
    <div
      className="profile-modal"
      onClick={(e) => {
        if (e.target.className === "profile-modal") setOpen();
      }}
    >
      <div className="profile">
        <h1>{user.name.toUpperCase()}</h1>
        <img src={user.pic} alt="user-pic" />
        <h2>Email : {user.email}</h2>

      </div>
    </div>
  );
};

export default Profile

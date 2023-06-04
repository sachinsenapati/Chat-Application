import "./UserBadgeItem.css";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const UserBadgeItem = ({ user, handleDelete }) => {
  return (
    <div className="user-badge-item">
      <p>{user.name}</p>
      <RxCross2
        className="cross-icon"
        onClick={() => {
          handleDelete(user);
        }}
      />
    </div>
  );
};

export default UserBadgeItem;

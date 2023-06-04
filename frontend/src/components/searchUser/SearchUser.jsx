import React from "react";
import "./SearchUser.css";

const SearchUser = ({ users, handleGroup }) => {
  return (
    <div
      key={users._id}
      className="single-search-user"
      onClick={() => {
        handleGroup(users);
      }}
    >
      <img src={users.pic} alt="" />
      <div>
        <p>{users.name}</p>
        <p>
          <b>Email:</b> {users.email}
        </p>
      </div>
    </div>
  );
};

export default SearchUser;

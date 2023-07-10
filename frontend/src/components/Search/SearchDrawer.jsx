import { useDispatch, useSelector } from "react-redux";
import "./SearchDrawer.css";
import React, { useState } from "react";
import { searchUserApi } from "../../store/slice/SearchUserSlice";
import { BeatLoader } from "react-spinners";
import SearchUser from "../searchUser/SearchUser";
import { createChatAPI } from "../../store/slice/ChatSlice";
const SearchDrawer = ({ setOpenSideDrawer }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.searchUser);
const handleClick = async () => {
  if (search) {
    await dispatch(searchUserApi(search));
  }
};
  // eslint-disable-next-line
  const accessChat = (user) => {
    console.log(user._id);
    dispatch(createChatAPI({ userId: user._id }));
    setOpenSideDrawer(false);
  };

  return (
    <div className="searchDrawer-modal" onClick={(e)=>{
      if (e.target.className === "searchDrawer-modal") setOpenSideDrawer(false);
    }}>
      <div className="serachDrawer">
        <h2>Search Users</h2>
        <div className="search-user">
          <input
            className="serach-tab"
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button className="search-button" onClick={handleClick}>
            Go
          </button>
        </div>
        {data.loading ? (
          <div className="spinner">
            <BeatLoader color="#36d7b7" />
          </div>
        ) : (
          <>
            {data.searchUser.map((user) => (
              <SearchUser
                key={user._id}
                users={user}
                handleGroup={accessChat}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchDrawer;

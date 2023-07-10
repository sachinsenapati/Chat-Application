import React, { useEffect, useState } from "react";
import "./groupChat.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { searchUserApi } from "../../store/slice/SearchUserSlice";
import { BeatLoader } from "react-spinners";
import SearchUser from "../searchUser/SearchUser";
import UserBadgeItem from "../UserBadgeItem/UserBadgeItem";
import { createGroupChatAPI } from "../../store/slice/ChatSlice";
const GroupChat = ({ setOpen, open }) => {
  const [chatName, setChatName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.searchUser);

  const handleSearch = async (query) => {
    setSearch(query);
    await dispatch(searchUserApi(search));
  };

  const handleGroup = (user) => {
    if (selectedUser.includes(user)) {
      console.log("Already exist");
    } else {
      setSelectedUser([...selectedUser, user]);
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUser(selectedUser.filter((sel) => sel._id !== delUser._id));
  };

  useEffect(() => {
    if (search) {
      dispatch(searchUserApi(search));
    }
  }, [dispatch, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      createGroupChatAPI({
        name: chatName,
        users: JSON.stringify(selectedUser.map((u) => u._id)),
      })
    );
    setOpen(false);
  };


  return (
    <div
      className="group-modal"
      onClick={(e) => {
        if (e.target.className === "group-modal") setOpen(false);
      }}
    >
      <div className="createGroupChat">
        <div className="createGroupChatHeader">
          <h2>Create Group Chat</h2>
          <RxCross2 className="icon" onClick={() => setOpen(false)} />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={chatName}
            placeholder="Chat Name"
            onChange={(e) => setChatName(e.target.value)}
          />

          <input
            type="text"
            value={search}
            placeholder="Add User to group"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="searchUser">
            {selectedUser.map((u) => (
              <UserBadgeItem key={u._id} user={u} handleDelete={handleDelete} />
            ))}
          </div>
          {data.loading ? (
            <BeatLoader color="#36d7b7" />
          ) : (
            <div>
              {data.searchUser.slice(0, 4).map((user) => (
                <SearchUser
                  key={user._id}
                  users={user}
                  handleGroup={handleGroup}
                />
              ))}
            </div>
          )}

          <button type="submit">Create Chat</button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;

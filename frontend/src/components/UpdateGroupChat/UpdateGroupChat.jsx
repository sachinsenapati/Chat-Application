import { RxCross2 } from "react-icons/rx";
import "./UpdateGroupChat.css";
import React, { useEffect, useState } from "react";
import { useChatState } from "../../store/slice/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { searchUserApi } from "../../store/slice/SearchUserSlice";
import UserBadgeItem from "../UserBadgeItem/UserBadgeItem";
import SearchUser from "../searchUser/SearchUser";

const UpdateGroupChat = ({ setOpen, open }) => {
  // Retrieve user and token from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  // Retrieve selectedChat from ChatSlice
  const { selectedChat } = useChatState();

  // State variables
  const [chatName, setChatName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");

  // Redux hooks
  const dispatch = useDispatch();
  const data = useSelector((state) => state.searchUser);

  // Function to handle chat renaming
  const handleRename = async () => {
    // API call to update chat name
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/chat/rename`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            chatName,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle user removal from the group
  const handleRemove = async (user1) => {
    // Only group admins or the user being removed can perform this action
    if (selectedChat.groupAdmin._id !== user.id && user1._id !== user.id) {
      console.log("Only admins can remove someone!");
      return;
    }
    // API call to remove user from the group
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/chat/groupremove`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            userId: user1._id,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.groupAdmin._id !== user.id) {
      console.log("Only admins can add someone!");
      return;
    }
    // Check if the user already exists in the group
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      console.log("User already exists in the group");
      return;
    }
    // API call to add user to the group
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/chat/groupadd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ chatId: selectedChat._id, userId: user1._id }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle search query for users
  const handleSearch = (query) => {
    setSearch(query);
    dispatch(searchUserApi(query));
  };

  // Fetch search results when search query changes
  useEffect(() => {
    if (search) {
      dispatch(searchUserApi(search));
    }
  }, [dispatch, search]);

  return (
    <div
      className="updatedGroupChatModal"
      onClick={(e) => {
        if (e.target.className === "updatedGroupChatModal") setOpen(false);
      }}
    >
      <div className="updateGroupChat">
        <div className="updateGroupChatHeader">
          <h2>{selectedChat.chatName.toUpperCase()}</h2>
          <RxCross2 className="icon" onClick={() => setOpen(!open)} />
        </div>
        <div className="users">
          {selectedChat.users.map((u) => (
            <UserBadgeItem key={u._id} user={u} handleDelete={handleRemove} />
          ))}
        </div>

        <div className="group-chatName">
          <input
            type="text"
            value={chatName}
            placeholder="Chat Name"
            onChange={(e) => setChatName(e.target.value)}
          />
          <button onClick={handleRename}>Update</button>
        </div>

        <div className="searchUser">
          <input
            type="text"
            value={search}
            placeholder="Add User to the Group"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="searchResults">
            {data.searchUser.slice(0, 4).map((user) => (
              <SearchUser
                key={user._id}
                users={user}
                handleGroup={handleAddUser}
              />
            ))}
          </div>
        </div>

        <button
          className={`leaveGroupButton ${
            selectedChat.groupAdmin._id === user.id
              ? "showLeaveGroupButton"
              : ""
          }`}
        >
          Leave group
        </button>
      </div>
    </div>
  );
};

export default UpdateGroupChat;
import { RxCross2 } from "react-icons/rx";
import "./UpdateGroupChat.css";
import React, { useEffect, useState } from "react";
import { setSelectedChat, useChatState } from "../../store/slice/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { searchUserApi } from "../../store/slice/SearchUserSlice";
import UserBadgeItem from "../UserBadgeItem/UserBadgeItem";
import SearchUser from "../searchUser/SearchUser";

const UpdateGroupChat = ({ setOpen, open }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  var user2 = user;
  user2._id = user.id;
  console.log({ user2 });
  const token = user.token;
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");
  const { selectedChat } = useChatState();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.searchUser);
  const handleSearch = (query) => {
    setSearch(query);
    if (!query) return;
    dispatch(searchUserApi(query));
  };

 const handleRename = async () => {
   if (!chatName) return;
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
     dispatch(setSelectedChat(result));
     console.log(result);
   } catch (error) {
     console.log(error);
   }
   setChatName("");
 };


  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      console.log("User already exists in the group");
      return;
    }

    if (selectedChat.groupAdmin._id !== user.id) {
      console.log("Only admins can add someone!");
      return;
    }

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
      dispatch(setSelectedChat(result));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    setChatName("");
  };


 const handleRemove = async (user1) => {
   if (selectedChat.groupAdmin._id !== user.id && user1._id !== user.id) {
     console.log("Only admins can remove someone!");
     return;
   }
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
     user1._id === user.id
       ? dispatch(setSelectedChat())
       : dispatch(setSelectedChat(result));
     console.log(result);
   } catch (error) {
     console.log(error);
   }
   setChatName("");
 };

  const handelLeaveGroup = () => {
    handleRemove(user2);
    setOpen(false);
  };

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
          <h2>{selectedChat?.chatName?.toUpperCase()}</h2>
          <RxCross2 className="icon" onClick={() => setOpen(!open)} />
        </div>
        <div className="users">
          {selectedChat?.users.map((u) => (
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

        <button className="leaveGroupButton" onClick={handelLeaveGroup}>
          Leave group
        </button>
      </div>
    </div>
  );
};

export default UpdateGroupChat;

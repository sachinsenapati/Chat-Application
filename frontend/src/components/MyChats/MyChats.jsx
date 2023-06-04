import "./MyChats.css";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import SingleChat from "../SingleChat/SingleChat";
import GroupChat from "../GroupChat/GroupChat";
import {
  MyChatAPI,
  setSelectedChat,
  useChatState,
} from "../../store/slice/ChatSlice";

const MyChats = () => {
  const [open, setOpen] = useState(false);
  const handleChatClick = (chatId) => {
    dispatch(setSelectedChat(chatId));
  };

  const { selectedChat, chats } = useChatState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MyChatAPI());
  }, [dispatch,chats]);

  return (
    <div className={`chatList ${selectedChat?"hidden":""}`}>
      {open && <GroupChat setOpen={setOpen} open={open} />}

      <div className="chatListHeader">
        <h2>My Chats</h2>
        <div className="groupChat" onClick={() => setOpen(true)}>
          New Group Chat <AiOutlinePlus className="icon" />
        </div>
      </div>

      <div className="chatsList">
        {chats.map((chat) => (
          <SingleChat
            key={chat._id}
            chat={chat}
            activeChat={selectedChat}
            setActiveChat={handleChatClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MyChats;

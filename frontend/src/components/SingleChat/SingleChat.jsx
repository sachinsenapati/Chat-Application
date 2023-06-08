import React from "react";
import "./singleChat.css";
import { useChatState } from "../../store/slice/ChatSlice";
import { getSenderFull } from "../../config/chatLogic";

const SingleChat = ({ chat, activeChat, setActiveChat }) => {
  const { user } = useChatState();
  const currentUser = user.id;

  const handleClick = () => {
    setActiveChat(chat);
  };

  return (
    <div
      className={`chatBox ${activeChat === chat ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className="avatar">
        <img src={getSenderFull(currentUser, chat.users).pic} alt="Avatar" />
      </div>
      <p>
        {!chat.isGroupChat
          ? getSenderFull(currentUser, chat.users).name
          : chat.chatName}
      </p>
      {chat.latestMessage && (
        <p className="latestMessage">
          <b>{chat.latestMessage.sender.name}:</b>{" "}
          {chat.latestMessage.content.length > 50
            ? chat.latestMessage.content.substring(0, 51) + "..."
            : chat.latestMessage.content}
        </p>
      )}
    </div>
  );
};

export default SingleChat;

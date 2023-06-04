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
      className={`single-chat ${activeChat === chat ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className="avatar">
        <img src={getSenderFull(currentUser,chat.users).pic} alt="Avatar" />
      </div>
      <div className="chat-content">
        {!chat.isGroupChat ? (
          <p className="chatName">
            {getSenderFull(currentUser, chat.users).name}
          </p>
        ) : (
          <p className="chatName">{chat.chatName}</p>
        )}
        <div className="additional-info">
          {/* Add additional elements here */}
          <span className="unread-count">5</span>
          <span className="last-message">Hello there!</span>
          <span className="timestamp">10:30 AM</span>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;

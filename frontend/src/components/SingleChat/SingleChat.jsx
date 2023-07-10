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

  const senderName = !chat.isGroupChat
    ? getSenderFull(currentUser, chat.users).name
    : chat.chatName;

  const latestMessageContent =
    chat.latestMessage && chat.latestMessage.content.length > 50
      ? chat.latestMessage.content.substring(0, 51) + "..."
      : chat.latestMessage?.content;

  return (
    <div
      className={`chatBox ${activeChat === chat ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className="avatar">
        <img src={getSenderFull(currentUser, chat.users).pic} alt="Avatar" />
      </div>
      <div className="chatContent">
        <div className="chatName">{senderName}</div>
        <div className="latestMessage">
          {chat.latestMessage && chat.chatName !== "sender" && (
            <b>{chat.latestMessage.sender.name} : </b>
          )}
          {latestMessageContent}
        </div>
      </div>
      {/* <div className="chatInfo">
        <span className="lastMessageTime">11:30 AM</span>
        <span className="unreadCount">20</span>
      </div> */}
    </div>
  );
};

export default SingleChat;

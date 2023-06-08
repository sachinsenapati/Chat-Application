import React from "react";
import "./ChatBox.css";
import SingleChatMessages from "../SingleChatMessages/SingleChatMessages";
import { useChatState } from "../../store/slice/ChatSlice";

const ChatBox = () => {
  const {selectedChat}=useChatState()
  return (
    <div className={`chatbox ${selectedChat ? "visible" : "hidden"}`}>
        <SingleChatMessages />
    </div>
  );
};

export default ChatBox;

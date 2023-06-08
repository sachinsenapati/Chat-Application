import React from "react";
import "./homePage.css";
import Header from "../../components/Header/Header";
import MyChats from "../../components/MyChats/MyChats";
import ChatBox from "../../components/ChatBox/ChatBox";
import { useChatState } from "../../store/slice/ChatSlice";

const HomePage = () => {
  const { user } = useChatState();

  return (
    <div className="chatpage-container">
      {user && <Header />}
      <div className="chatbox-container">
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </div>
  );
};

export default HomePage;

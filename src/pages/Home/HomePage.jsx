import React from "react";
import "./homePage.css";
import Header from "../../components/Header/Header";
import { useChatState } from "../../store/slice/ChatSlice";
import MyChats from "../../components/MyChats/MyChats";
import ChatBox from "../../components/ChatBox/ChatBox";
const HomePage = () => {
const { user } = useChatState();
// console.log(user)

  return (
    <div>
      {user && <Header />}
      <div className="chatPage">
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </div>
  );
};

export default HomePage;

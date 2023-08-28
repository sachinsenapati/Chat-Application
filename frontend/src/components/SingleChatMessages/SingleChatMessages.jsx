import "./SingleChatMessages.css";
import {
  setNotification,
  setSelectedChat,
  useChatState,
} from "../../store/slice/ChatSlice";
import { AiOutlineArrowLeft, AiTwotoneEye } from "react-icons/ai";
import Profile from "../Profile/Profile";
import UpdateGroupChat from "../UpdateGroupChat/UpdateGroupChat";
import React, { useEffect, useState, useCallback } from "react";
import { MessageAPI, createMessageAPI } from "../../store/slice/MessageSlice";
import { useDispatch } from "react-redux";
import { getSender, getSenderFull } from "../../config/chatLogic";
import ScrollableChat from "../ScrollableChat/ScrollableChat";

import io from "socket.io-client";
import { RiseLoader } from "react-spinners";
const ENDPOINT = process.env.REACT_APP_API;
var socket, selectedChatCompare;

const SingleChatMessages = () => {
  const [message, setMessage] = useState([]);
  const [openUser, setOpenUser] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const { selectedChat, user, notification } = useChatState();
  const [newMessage, setNewMessage] = useState("");
  const currentUser = user.id;
  const dispatch = useDispatch();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


const fetchMessages = useCallback(async () => {
  if (!selectedChat) return;
  try {
    const data = await dispatch(MessageAPI(selectedChat._id)).unwrap();
    console.log(data);
    setMessage(data);
    socket.emit("join chat", selectedChat._id);
  } catch (error) {
    console.log("Error in fetching the messages");
  } finally {
  }
}, [dispatch, selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const data = await dispatch(
          createMessageAPI({
            content: newMessage,
            chatId: selectedChat._id,
          })
        ).unwrap();
        setNewMessage("");
        console.log(data);
        socket.emit("new message", data);
        setMessage([...message, data]);
      } catch (error) {
        console.log("Error in sending the message");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.disconnect();
    };
  }, [user]);

useEffect(() => {
  const fetchAndJoinMessages = async () => {
    await fetchMessages();
    selectedChatCompare = selectedChat;
  };

  fetchAndJoinMessages();
}, [selectedChat, fetchMessages, message]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          dispatch(setNotification([newMessageReceived, ...notification]));
        }
      } else {
        setMessage([...message, newMessageReceived]);
      }
    });
  }, [message, notification, dispatch]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="single-chat">
      {openUser && (
        <Profile
          user={getSenderFull(currentUser, selectedChat.users)}
          setOpen={setOpenUser}
          open={openUser}
        />
      )}
      {openGroup && <UpdateGroupChat setOpen={setOpenGroup} open={openGroup} />}

      {selectedChat ? (
        <>
          <div className="text">
            {message && !selectedChat.isGroupChat ? (
              <>
                <div
                  className="backButton"
                  onClick={() => dispatch(setSelectedChat(""))}
                >
                  <AiOutlineArrowLeft />
                </div>
                <div className="sender">
                  <h3>
                    {getSender(currentUser, selectedChat.users).toUpperCase()}
                  </h3>
                </div>
                <div>
                  <AiTwotoneEye
                    className="view-icon"
                    onClick={() => {
                      setOpenUser(!openUser);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  className="backButton"
                  onClick={() => dispatch(setSelectedChat(""))}
                >
                  <AiOutlineArrowLeft />
                </div>
                <div className="chat-name">
                  <h3>{selectedChat.chatName.toUpperCase()}</h3>
                </div>
                <div>
                  <AiTwotoneEye
                    className="view-icon"
                    onClick={() => {
                      setOpenGroup(!openGroup);
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="box">
              <>
                <div className="messages">
                  <ScrollableChat messages={message} />
                </div>
                <div className="input-container">
                  {isTyping && (
                    <div >
                      <RiseLoader color="#36d7b7" size={6} />
                    </div>
                  )}
                  <input
                    className="input"
                    placeholder="Enter a message..."
                    type="text"
                    value={newMessage}
                    onKeyDown={sendMessage}
                    required
                    onChange={typingHandler}
                  />
                </div>
              </>
          </div>
        </>
      ) : (
        <div className="empty-chat">
          <span className="empty-chat-text">
            Click on a user to start chatting
          </span>
        </div>
      )}
    </div>
  );
};

export default SingleChatMessages;

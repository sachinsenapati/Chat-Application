import "./SingleChatMessages.css";
import { useChatState } from "../../store/slice/ChatSlice";
import { AiTwotoneEye } from "react-icons/ai";
import Profile from "../Profile/Profile";
import UpdateGroupChat from "../UpdateGroupChat/UpdateGroupChat";
import React, { useEffect, useState } from "react";
import { MessageAPI, createMessageAPI } from "../../store/slice/MessageSlice";
import { BeatLoader, RiseLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { getSender, getSenderFull } from "../../config/chatLogic";
import ScrollableChat from "../ScrollableChat/ScrollableChat";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
let socket;

const SingleChatMessages = () => {
  const [message, setMessage] = useState([]);
  const [openUser, setOpenUser] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const { selectedChat, user } = useChatState();
  const [newMessage, setNewMessage] = useState("");
  const currentUser = user.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const data = await dispatch(MessageAPI(selectedChat._id)).unwrap();
      console.log(data);
      setMessage(data);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log("Error in fetching the messages");
    }
  };

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
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selectedChat, message]);

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

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        console.log("notification");
        // Rest of the code...
      } else {
        setMessage([...message, newMessageReceived]);
      }
    });
  }, [message]);

  return (
    <div className="single-chat-message">
      {openUser && (
        <Profile user={getSenderFull} setOpen={setOpenUser} open={openUser} />
      )}
      {openGroup && <UpdateGroupChat setOpen={setOpenGroup} open={openGroup} />}

      {selectedChat ? (
        <div className="selectedChat">
          <div className="chat-header">
            {!selectedChat.isGroupChat ? (
              <>
                <h3>
                  {getSender(currentUser, selectedChat.users).toUpperCase()}
                </h3>
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
                <h3>{selectedChat.chatName.toUpperCase()}</h3>
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

          <div className="messages-wrapper">
            {loading ? (
              <BeatLoader color="#36d7b7" />
            ) : (
              <div className="messages">
                <ScrollableChat messages={message} />
              </div>
            )}
            <div className="type">
              {istyping ? (
                <div style={{ marginLeft: "1.5rem" }}>
                  {" "}
                  <RiseLoader color="#36d7b7" size={6} />
                </div>
              ) : (
                ""
              )}
              <input
                className="message-input"
                placeholder="Type"
                type="text"
                value={newMessage}
                onKeyDown={sendMessage}
                required
                onChange={typingHandler}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="notChatSelected">
          <h1>Click on a user to start chatting</h1>
        </div>
      )}
    </div>
  );
};

export default SingleChatMessages;

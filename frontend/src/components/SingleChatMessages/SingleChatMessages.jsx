import "./SingleChatMessages.css";
import { useChatState } from "../../store/slice/ChatSlice";
import { AiTwotoneEye } from "react-icons/ai";
import Profile from "../Profile/Profile";
import UpdateGroupChat from "../UpdateGroupChat/UpdateGroupChat";
import React, { useEffect, useState } from "react";
import {
  MessageAPI,
  createMessageAPI,
  useMessageState,
} from "../../store/slice/MessageSlice";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { getSender, getSenderFull } from "../../config/chatLogic";
import ScrollableChat from "../ScrollableChat/ScrollableChat";

const SingleChatMessages = () => {
  const [openUser, setOpenUser] = useState(false);
  const [openGroup, setGroup] = useState(false);
  const { selectedChat, user } = useChatState();
  const [newMessage, setNewMessage] = useState("");
  const currentUser = user.id;
  const dispatch = useDispatch();
  const { loading, messages } = useMessageState();

  const sendMessage = (e) => {
    if (e.key === "Enter" && newMessage) {
      dispatch(
        createMessageAPI({
          content: newMessage,
          chatId: selectedChat._id,
        })
      );
      setNewMessage("");
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    if (!selectedChat) return;
    console.log(selectedChat);
    dispatch(MessageAPI(selectedChat._id));
  }, [dispatch, selectedChat, newMessage]);

  return (
    <div className="single-chat-message">
      {openUser && (
        <Profile user={getSenderFull} setOpen={setOpenUser} open={openUser} />
      )}
      {openGroup && <UpdateGroupChat setOpen={setGroup} open={openGroup} />}

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
                      setGroup(!openGroup);
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
                <ScrollableChat messages={messages} />
              </div>
            )}
            <div className="type">
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

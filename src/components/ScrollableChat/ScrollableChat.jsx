// ScrollableChat.js
import "./ScrollableChat.css";
import React from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/chatLogic";
import { useChatState } from "../../store/slice/ChatSlice";

const CustomAvatar = ({ name, src }) => {
  if (!name) {
    return null;
  }

  return (
    <div className="avatar">
      {src ? (
        <img className="avatar-image" src={src} alt={name} />
      ) : (
        <span className="avatar-initials">{name[0]}</span>
      )}
    </div>
  );
};

const ScrollableChat = ({ messages }) => {
  const { user } = useChatState();

  return (
    <div className="scrollable-chat-container">
      {messages &&
        messages.map((m, i) => (
          <div className="message-container" key={m._id}>
            {(isSameSender(messages, m, i, user.id) ||
              isLastMessage(messages, i, user.id)) && (
              <CustomAvatar name={m.sender.name} src={m.sender.pic} />
            )}
            <span
              className={`message-content ${
                m.sender._id === user.id ? "user-message" : "other-message"
              }`}
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;

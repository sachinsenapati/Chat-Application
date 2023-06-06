import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/chatLogic";
import { useChatState } from "../../store/slice/ChatSlice";

const ScrollableChat = ({ messages }) => {
  const { user } = useChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <div
                title={m.sender.name}
                style={{
                  marginTop: "7px",
                  marginRight: "1px",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                  backgroundImage: `url(${m.sender.pic})`,
                  backgroundSize: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user.id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

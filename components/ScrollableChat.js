import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { format, parseISO } from "date-fns";
import ScrollableFeed from 'react-scrollable-feed'
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { useRef, useEffect } from "react";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollableFeed className="flex flex-col-reverse">
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex"}} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}

            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
              className="leading-[1.1]"
            >
              <div ref={messagesEndRef} />
              <small className="text-[9px] ">
                {format(parseISO(m.createdAt), "h:mm:aa")}
              </small>
              <div>{m.content}</div>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

import { Avatar } from '@chakra-ui/avatar';
import { Tooltip } from '@chakra-ui/tooltip';
import { format, parseISO } from 'date-fns';
import ScrollableFeed from 'react-scrollable-feed';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  getSender,
} from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import { useRef, useEffect } from 'react';
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollableFeed className="flex flex-col-reverse">
      {messages &&
        messages.map((m, i) => (
          <div key={m._id}>
            <div className={`chat ${getSender ? 'chat-start' : 'chat-end'}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  {(isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)) && (
                    <Tooltip
                      label={m.sender.name}
                      placement="bottom-start"
                      hasArrow
                    >
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
                </div>
              </div>
              <div className="chat-header">
                username
                <time className="text-xs opacity-50">
                  {format(parseISO(m.createdAt), 'h:mm:aa')}
                </time>
              </div>
              <div
                className="chat-bubble"
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id
                      ? 'rgba(185,233,252)'
                      : 'rgba(0, 0, 0, .4)'
                  }`,
                  color: `${
                    m.sender._id === user._id ? 'rgba(0, 0, 0, .8)' : 'white'
                  }`,
                }}
              >
                {m.content}
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

/* {
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
  <div className="chat chat-start">
  <div
    style={{
      backgroundColor: `${
        m.sender._id === user._id
          ? 'rgba(185,233,252)'
          : 'rgba(0, 0, 0, .4)'
      }`,
      color: `${
        m.sender._id === user._id ? 'rgba(0, 0, 0, .8)' : 'white'
      }`,
      marginLeft: isSameSenderMargin(messages, m, i, user._id),
      marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
      // borderRadius: '20px',
      // padding: '5px 15px',
      // maxWidth: '75%',
    }}
    className="leading-[1.1] chat-bubble"
  >
    <small className="text-[9px] ">
      {format(parseISO(m.createdAt), 'h:mm:aa')}
    </small>
    <div>{m.content}</div>
  </div>
}

*/

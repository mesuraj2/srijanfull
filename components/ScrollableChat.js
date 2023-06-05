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
    <ScrollableFeed className="flex flex-col-reverse py-10 h-screen">
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

              <div
                className="chat-bubble"
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? '#1F2937' : '#1F2937'
                  }`,
                  borderLeft: `${
                    m.sender._id === user._id
                      ? '10px solid green'
                      : '10px solid #B9E9FC'
                  }`,
                  color: `${m.sender._id === user._id ? 'white' : 'white'}`,
                }}
              >
                <div>
                  <div
                    className={`${
                      m.sender._id === user._id
                        ? 'text-green-500'
                        : 'text-[#B9E9FC]'
                    } chat-header flex gap-5`}
                  >
                    username
                  </div>
                  <p className="max-w-[10rem]">
                    {m.content}
                    {m.content}
                    {m.content}
                    {m.content}
                    {m.content}
                    {m.content}
                    {m.content}
                  </p>
                </div>
              </div>
              <div className=" flex justify-between w-[10rem]">
                {/* <div className="chat-footer opacity-50">Delivered</div> */}
                <time className="text-xs opacity-70">
                  {format(parseISO(m.createdAt), 'h:mm:aa')}
                </time>
              </div>
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

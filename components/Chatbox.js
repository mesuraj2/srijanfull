import { Box } from '@chakra-ui/layout';
// import "./styles.css";
import SingleChat from './SingleChat';
import { ChatState } from '../Context/ChatProvider';

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      className={selectedChat ? 'selecon' : 'selecof'}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="red"
      sx={{
        backgroundImage: `linear-gradient(45deg,
          rgba(245,70,66, 0.75),
          rgba(8,83,156, 0.75)), url(
          'https://st2.depositphotos.com/1866209/7180/v/950/depositphotos_71807575-stock-illustration-doodle-icons-seamless-travel-pattern.jpg'
        )`,
      }}
      w={{ base: '100vh', md: '64%' }}
      borderRadius="sm"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;

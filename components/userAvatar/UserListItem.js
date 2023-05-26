import { Avatar } from '@chakra-ui/avatar';
import { Box, Text } from '@chakra-ui/layout';
import { ChatState } from '../../Context/ChatProvider';

const UserListItem = ({ user, handleFunction }) => {
  // const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      _hover={{
        transform: 'scale(1.01)',
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
      sx={{
        backgroundColor: '#B9E9FC',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px 0' }}>
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={user.name}
          src={user.pic}
        />
        <Text>{user.name}</Text>
      </Box>
      <Box>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;

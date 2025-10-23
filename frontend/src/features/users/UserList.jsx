import { List, Typography } from '@mui/material';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useGetUsersQuery, useSendFriendRequestMutation, useGetMeQuery } from '../../services/apiSlice.js';
import UserListItem from './UserListItem.jsx';

const UserList = () => {
  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const { data: me } = useGetMeQuery();
  const [sendFriendRequest, { isLoading: isSending }] = useSendFriendRequestMutation();

  const handleSendRequest = async (targetid) => {
    try {
      await sendFriendRequest({ targetid }).unwrap();
      alert('Friend request sent!');
    } catch (err) {
      console.error('Failed to send request:', err);
      alert(err.data?.message || 'Failed to send request');
    }
  };

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    const otherUsers = users.filter((user) => me && user.id !== me.id);

    content = (
      <List>
        {otherUsers.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            onSendRequest={handleSendRequest}
            isSending={isSending}
          />
        ))}
      </List>
    );
  } else if (isError) {
    content = <ErrorMessage message={error.toString()} />;
  }

  return <div>{content}</div>;
};

export default UserList;
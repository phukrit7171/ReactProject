import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatRoomList from '../features/chat/ChatRoomList';
import ChatWindow from '../features/chat/ChatWindow';
import { useGetRoomsQuery } from '../features/chat/chatroomsApi';
import { setRooms } from '../features/chat/chatSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { activeRoomId } = useSelector((state) => state.chat);
  const { data: rooms, isLoading } = useGetRoomsQuery();

  useEffect(() => {
    if (rooms) {
      dispatch(setRooms(rooms));
    }
  }, [rooms, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <ChatRoomList />
      {activeRoomId ? (
        <ChatWindow />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default ChatPage;
// FriendRequestList.jsx
import React from "react";
import FriendRequestItem from "./FriendRequestItem";

const FriendRequestList = ({ requests, type }) => {
  return (
    <div>
      {requests.map((r) => (
        <FriendRequestItem key={r.friendshipid} request={r} type={type} />
      ))}
    </div>
  );
};

export default FriendRequestList;

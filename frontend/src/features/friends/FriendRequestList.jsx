import React from "react";
import FriendRequestItem from "./FriendRequestItem";

const FriendRequestList = ({ requests, type }) => {
  if (!requests.length) return <p>No requests.</p>;

  return (
    <div>
      {requests.map((r) => (
        <FriendRequestItem key={r.friendshipid} request={r} type={type} />
      ))}
    </div>
  );
};

export default FriendRequestList;

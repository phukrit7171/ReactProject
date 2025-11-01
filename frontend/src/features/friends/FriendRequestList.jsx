import React from "react";
import FriendRequestItem from "./FriendRequestItem";

// Displays list of friend requests
const FriendRequestList = ({ requests, type }) => {
  if (!requests.length) return <p>No requests.</p>;

  return (
    <div>
      {requests.map((r) => (
        <FriendRequestItem key={r.id} request={r} type={type} />
      ))}
    </div>
  );
};

export default FriendRequestList;

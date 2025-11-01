import React from "react";
import FriendRequestItem from "./FriendRequestItem";

// Displays a list of friend requests
const FriendRequestList = ({ requests, type }) => {
  if (!requests || !Array.isArray(requests) || !requests.length) {
    return <p>No {type} requests.</p>;
  }

  return (
    <div>
      {requests.map((r) => (
        <FriendRequestItem key={r.id} request={r} type={type} />
      ))}
    </div>
  );
};

export default FriendRequestList;

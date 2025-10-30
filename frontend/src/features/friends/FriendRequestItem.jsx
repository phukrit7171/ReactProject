// FriendRequestItem.jsx
import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import axios from "axios";

const FriendRequestItem = ({ request, type }) => {  
  const handleRespond = async (response) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/friend/response/${request.friendshipid}`,
        { response },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Request ${response === "accept" ? "accepted" : "declined"}!`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography>{type === "sent" ? request.receiver.username : request.sender.username}</Typography>

        {type === "received" ? (
          <Box>
            <Button size="small" color="success" onClick={() => handleRespond("accept")}>
              Accept
            </Button>
            <Button size="small" color="error" onClick={() => handleRespond("decline")}>
              Decline
            </Button>
          </Box>
        ) : (
          <Typography color="text.secondary">Pending...</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FriendRequestItem;

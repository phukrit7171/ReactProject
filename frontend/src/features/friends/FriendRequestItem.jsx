import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import axios from "axios";

const FriendRequestItem = ({ request, type }) => {
  const handleRespond = async (response) => {
    try {
      await axios.put(
        `http://localhost:3001/v1/friend/response/${request.friendshipid}`,
        { response }
      );

      alert(`Request ${response === "accept" ? "accepted" : "declined"}!`);
    } catch (err) {
      console.error(err);
      alert("Failed to respond to request. Check console for details.");
    }
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography>
          {type === "sent" ? request.receiver.username : request.sender.username}
        </Typography>

        {type === "received" ? (
          <Box>
            <Button
              size="small"
              color="success"
              onClick={() => handleRespond("accept")}
              sx={{ mr: 1 }}
            >
              Accept
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => handleRespond("decline")}
            >
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

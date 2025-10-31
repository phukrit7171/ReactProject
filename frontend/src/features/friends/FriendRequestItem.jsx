import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useRespondToRequestMutation } from "../../services/apiSlice"; 

const FriendRequestItem = ({ request, type }) => {
  const [respondToRequest] = useRespondToRequestMutation();

  const handleRespond = async (response) => {
    try {
      await respondToRequest({
        friendshipId: request.friendshipid,
        response, 
      }).unwrap();
      alert(`Request ${response === "accept" ? "accepted" : "declined"}!`);
    } catch (error) {
      console.error("Failed to respond:", error);
      alert("Failed to respond to request");
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
            <Button size="small" color="success" onClick={() => handleRespond("accept")} sx={{ mr: 1 }}>
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

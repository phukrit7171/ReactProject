import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useRespondToRequestMutation } from "../../services/apiSlice"; 

// Component to display a single friend request with accept/decline options
const FriendRequestItem = ({ request, type }) => {
  const [respondToRequest] = useRespondToRequestMutation();

  const handleRespond = async (response) => {
    // Log the request object for debugging
    console.log("Request object:", request);
    console.log("Available ID fields:", {
      id: request.id,
      friendshipid: request.friendshipid,
      friendshipId: request.friendshipId
    });

    // Validate that the request has a valid ID before attempting to respond
    const requestId = request.id || 
                      request.friendshipid || 
                      request.friendshipId || 
                      (request.dataValues ? request.dataValues.friendshipid : undefined);
    
    if (!requestId) {
      alert("Error: Cannot process request - request ID is missing.");
      console.error("Request object missing valid ID:", request);
      console.error("Available keys in request:", Object.keys(request));
      return;
    }

    try {
      await respondToRequest({
        friendshipId: requestId,
        response, 
      }).unwrap();
      alert(`Request ${response === "accept" ? "accepted" : "declined"}!`);
    } catch (error) {
      console.error("Failed to respond:", error);
      let errorMessage = "Failed to respond to request";
      if (error?.data?.error) {
        errorMessage = error.data.error;
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.error) {
        errorMessage = error.error;
      }
      // Provide more specific error messages
      if (errorMessage.includes("not found")) {
        alert("The friend request was not found or has already been processed.");
      } else if (errorMessage.includes("authorized")) {
        alert("You are not authorized to respond to this request.");
      } else if (errorMessage.includes("Invalid response")) {
        alert("Invalid response. Please use 'accept' or 'decline'.");
      } else {
        alert(`Error: ${errorMessage}`);
      }
    }
  };

  const senderName = request.sender?.username || 'Unknown User';
  const receiverName = request.receiver?.username || 'Unknown User';
  const displayName = type === "sent" ? receiverName : senderName;

  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography>
          {displayName}
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
        ) : type === "sent" ? (
          <Typography color="text.secondary">Waiting for response...</Typography>
        ) : (
          <Typography color="text.secondary">Pending...</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FriendRequestItem;

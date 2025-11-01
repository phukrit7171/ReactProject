import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useDeleteFriendMutation, useGetMeQuery } from "../../services/apiSlice";

// Displays list of friends with delete functionality
const FriendList = ({ friendships }) => {
  const [deleteFriend] = useDeleteFriendMutation();
  const { data: currentUser } = useGetMeQuery(); // Get current user data

  if (!friendships.length) return <Typography>No friends yet.</Typography>;

  // Get current user ID from the API response
  const currentUserId = currentUser?.id;

  return (
    <Box sx={{ p: 2 }}>
      {friendships.map((friendship) => {
        // Determine friend's name based on which user is current user
        const friend = friendship.sender?.id === currentUserId 
          ? friendship.receiver 
          : friendship.sender;
        const friendName = friend?.username || 'Unknown User';

        return (
          <Card key={friendship.id} sx={{ mb: 2, boxShadow: 2 }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{friendName}</Typography>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={async () => {
                  try {
                    await deleteFriend(friendship.id).unwrap();
                  } catch (error) {
                    // Handle different error response formats
                    let errorMessage = "Failed to remove friend";
                    if (error?.data?.error) {
                      // Backend returns { message: "Error removing friendship.", error: "Specific error message" }
                      errorMessage = error.data.error;
                    } else if (error?.data?.message) {
                      errorMessage = error.data.message;
                    } else if (error?.error) {
                      errorMessage = error.error;
                    }
                    alert(`Error: ${errorMessage}`);
                  }
                }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default FriendList;

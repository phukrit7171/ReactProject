import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useDeleteFriendMutation } from "../../services/apiSlice";

const FriendList = ({ friends }) => {
  const [deleteFriend] = useDeleteFriendMutation();

  if (!friends.length) return <Typography>No friends yet.</Typography>;

  const currentUser = localStorage.getItem("username") || "alice";

  return (
    <Box sx={{ p: 2 }}>
      {friends.map((f) => {
        const friendName = f.sender.username === currentUser ? f.receiver.username : f.sender.username;

        return (
          <Card key={f.friendshipid} sx={{ mb: 2, boxShadow: 2 }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{friendName}</Typography>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => deleteFriend(f.friendshipid)}
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

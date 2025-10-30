// FriendList.jsx
import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const FriendList = ({ friends }) => {
  if (!friends.length) return <Typography>No friends yet.</Typography>;
  const currentUser = localStorage.getItem("username");

  return (
    // ถ้าเราคือ sender → แสดงชื่อ receiver
    // ถ้าเราคือ receiver → แสดงชื่อ sender
    <Box sx={{ p: 2 }}>
      {friends.map((f) => {
        const friendName =
          f.sender.username === currentUser
            ? f.receiver.username
            : f.sender.username;

        return (
          <Card key={f.friendshipid} sx={{ mb: 2, boxShadow: 2 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                {friendName}
              </Typography>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => alert(`Delete ${friendName}`)}
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

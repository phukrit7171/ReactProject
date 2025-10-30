// ✅ FriendsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import FriendList from "../features/friends/FriendList";
import FriendRequestList from "../features/friends/FriendRequestList";

const FriendsPage = () => {
  const [view, setView] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [pendingSent, setPendingSent] = useState([]);
  const [pendingReceived, setPendingReceived] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/v1/friends/status/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFriends(res.data.friends);
        setPendingSent(res.data.pendingSent);
        setPendingReceived(res.data.pendingReceived);
      } catch (error) {
        console.error("Error fetching friend status:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Friends
        </Typography>

        <FormControl size="small" sx={{ mb: 3 }}>
          <Select value={view} onChange={(e) => setView(e.target.value)}>
            <MenuItem value="friends">Friends</MenuItem>
            <MenuItem value="request">Requests</MenuItem>
            <MenuItem value="sending">Sending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          width: "400px",
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 2,
          boxShadow: 1,
          backgroundColor: "white",
        }}
      >
        {view === "friends" && <FriendList friends={friends} />}
        {view === "request" && <FriendRequestList requests={pendingReceived} type="received" />}
        {view === "sending" && <FriendRequestList requests={pendingSent} type="sent" />}
      </Box>
    </Box>
  );
};

export default FriendsPage;
